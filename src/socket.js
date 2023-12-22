import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// https://be-collector.thinkmatch.id
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://10.115.176.138:3939';

export const socket = io(URL);