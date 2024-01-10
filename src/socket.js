import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

// https://be-collector.thinkmatch.id
const URL = 'https://be-collector.thinkmatch.id'
// const URL = 'http://127.0.0.1:3939'


export const socket = io(URL);