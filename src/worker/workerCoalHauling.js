export default () => {
    let socket = null;

    const connect = () => {
        const link = 'ws://127.0.0.1:9002/websocket';
        socket = new WebSocket(link);

        socket.onopen = () => {
            console.log('WebSocket connected successfully.');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
            // Reconnect logic can be implemented here if needed
        };
    };

    const transformData = (val, user) => ({
        tanggal: val[0],
        shift: val[1],
        unit: val[2],
        operator: val[3],
        tonnage: val[4],
        loader: val[5],
        pit: val[6],
        seam: val[7],
        in_rom: val[8],
        dump_time: val[9],
        time_hauling: val[10],
        dumping: val[11],
        remark: val[12],
        sentBy: user.fullname
    });

    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const handleSubmitToServer = async (dataArray, user) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            connect();
            setTimeout(() => {
                handleSubmitToServer(dataArray, user);
            }, 1000); // Retry after 1 second
            return;
        }
    
        const dataToSave = dataArray.filter(arr => arr.some(item => item !== ''));
    
        if (dataToSave.length === 0) {
            self.postMessage({ eventName: 'disconnected', eventData: true });
            return;
        }
    
        const transformedData = dataToSave.map(val => transformData(val, user));
        const chunkSize = 200;
        const chunks = chunkArray(transformedData, chunkSize);
    
        chunks.forEach((chunk, index) => {
            setTimeout(() => {
                self.postMessage({ eventName: 'emitSocket', eventData: true });
                const payload = { event: 'data-hauling-mha', data: chunk };
                if (index === chunks.length - 1) {
                    payload.lastChunk = true;
                }
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(payload));
                } else {
                    console.error('WebSocket connection not open.');
                }
            }, index * 100);
        });
    
        self.postMessage({ eventName: 'openDialog', eventData: true });
    
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.event) {
                case 'dataReceived':
                    self.postMessage({ eventName: 'dataReceived', eventData: data.message });
                    break;
                case 'savingProgress':
                    self.postMessage({ eventName: 'savingProgress', eventData: parseFloat((data.message) / chunks.length * 100) });
                    break;
                case 'error':
                    console.error('Server error:', data);
                    break;
                case 'data-inserted':
                    console.log('Data inserted successfully.');
                    self.postMessage({ eventName: 'data-inserted', eventData: 'data inserted' });
                    break;
                default:
                    break;
            }
        };
    };
    

    // Listen for messages from main thread
    self.onmessage = (event) => {
        const { data, user } = event.data;
        handleSubmitToServer(data, user);
    };
};
