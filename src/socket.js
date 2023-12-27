import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

// https://be-collector.thinkmatch.id
const URL = import.meta.env.VITE_LINK_BACKEND


export const socket = io(URL);