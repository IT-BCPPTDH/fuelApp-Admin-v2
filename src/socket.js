import { io } from 'socket.io-client';

const URL = 'https://be-collector.thinkmatch.id'
// const URL = 'http://127.0.0.1:3939'

const initializedSocket = () => {
    const socket = io(URL);
    return socket;
};
export default initializedSocket