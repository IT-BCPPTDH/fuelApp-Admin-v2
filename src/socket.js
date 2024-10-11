const link = import.meta.env.VITE_SOCKET_USER;

let socket; // Declare socket variable outside the function to reuse the connection

const initializeSocket = () => {
    // Check if socket already exists and is open
    // if (socket && socket.readyState === WebSocket.OPEN) {
    //     return socket;
    // }

    // // Create a new socket if not already created or closed
    // socket = new WebSocket(link);

    // // Error handling
    // socket.onerror = (error) => {
    //     console.error('WebSocket error:', error);
    // };

    // return socket;
};

export default initializeSocket;
