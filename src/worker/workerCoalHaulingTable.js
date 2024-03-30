const workerCoalHaulingTable = () => {
    let fetched = false
    const handleMessage = async (data) => {

        const { apiUrl } = data;

        try {

            if(!fetched){
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                fetched = true
                // Send the fetched data back to the main thread
                self.postMessage({ data });
            }
          
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
            self.postMessage({ error: error.message });
        }
    };


    self.onmessage = (event) => {
        // console.log(event.data)
        const { data } = event;
        handleMessage(data);
    };
}

export default workerCoalHaulingTable
