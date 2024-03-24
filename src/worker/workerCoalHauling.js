export default () => {

    const link = 'ws://127.0.0.1:9002/websocket';
    const socket = new WebSocket(link);
 
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
        console.log(dataArray)
        
        const dataToSave = dataArray.filter(arr => arr.some(item => item !== ''));

        // if (!socket || dataToSave.length === 0) return;

        const transformedData = dataToSave.map(val => transformData(val, user));
        const chunkSize = 250;
        const chunks = chunkArray(transformedData, chunkSize);

        chunks.map((chunk, index) => {
            setTimeout(() => {
                // Post message to main thread to emit socket event and update progress
                self.postMessage({ eventName: 'emitSocket', eventData: { event: 'data-hauling-mha', data: chunk } });
                socket.send(JSON.stringify({ event: 'data-hauling-mha', data: chunk }))
                self.postMessage({ eventName: 'updateProgress', eventData: (index + 1) / chunks.length * 100 });


            }, index * 100);
        });
        console.log("Proses Mulai")
        // Post message to main thread to open dialog and handle socket events
        self.postMessage({ eventName: 'openDialog', eventData: true });
        socket.addEventListener('data_received', (message) => {
          console.log(message)
        });
    };

    // Listen for messages from main thread
    self.onmessage = (event) => {
        console.log(event)
        const { data, user } = event.data;
        handleSubmitToServer(data, user);
    };

}