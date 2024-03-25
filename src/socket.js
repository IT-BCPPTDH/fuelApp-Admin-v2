const link = import.meta.env.VITE_SOCKET_USER;

const initializedSocket = () => {
    const socket = new WebSocket(link);
    return socket;
};

export default initializedSocket;
