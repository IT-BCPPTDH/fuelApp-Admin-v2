
export default () => {

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

        const link = 'ws://127.0.0.1:9002/websocket';
        const socket = new WebSocket(link);

        const dataToSave = dataArray.filter(arr => arr.some(item => item !== ''));

        if (!socket || dataToSave.length === 0) {
            self.postMessage({ eventName: 'disconnected', eventData: true });
        }

        const transformedData = dataToSave.map(val => transformData(val, user));
        const chunkSize = 250;
        const chunks = chunkArray(transformedData, chunkSize);

        chunks.map((chunk, index) => {
            const isLastChunk = index === chunks.length - 1;

            setTimeout(() => {
                self.postMessage({ eventName: 'emitSocket', eventData: true });
                const payload = { event: 'data-hauling-mha', data: chunk };
                if (isLastChunk) {
                    payload.lastChunk = true;
                }
                socket.send(JSON.stringify(payload));

                // self.postMessage({ eventName: 'updateProgress', eventData: (index + 1) / chunks.length * 100 });
            }, index * 100);
        });

        // console.log("Proses Mulai")
        // Post message to main thread to open dialog and handle socket events
        self.postMessage({ eventName: 'openDialog', eventData: true });

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data);
            switch (data.event) {
                case 'dataReceived':
                    self.postMessage({ eventName: 'dataReceived', eventData: data.message })
                    break;
                case 'savingProgress':
                    console.log(chunks.length)
                    self.postMessage({ eventName: 'savingProgress', eventData: parseFloat((data.message + 1) / chunks.length * 100) })
                    break;
                case 'error':
                    console.log(data)
                    break;

                default:
                    break;
            }

        };

        // socket.close()

    };

    // Listen for messages from main thread
    self.onmessage = (event) => {
        const { data, user } = event.data;
        handleSubmitToServer(data, user);
    };

}