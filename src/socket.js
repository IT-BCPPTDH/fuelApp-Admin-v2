// import { io } from 'socket.io-client';
// const link = import.meta.env.VITE_LINK_BACKEND;

// const initializedSocket = () => {
//     const socket = io(link);
//     return socket;
// };
// export default initializedSocket

const link = import.meta.env.VITE_SOCKET_USER;

const initializedSocket = () => {
    const socket = new WebSocket(link);
    return socket;
};

export default initializedSocket;
