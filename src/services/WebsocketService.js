// WebsocketService.js
const WebsocketURL = import.meta.env.VITE_SOCKET_USER

const WebsocketService = (onMessageCallback) => {
    // Set your default WebSocket endpoint here
    // const socket = new WebSocket(WebsocketURL);
  
    // socket.onopen = () => {
    //   console.log('WebSocket connection opened');
    // };
  
    // socket.onmessage = (event) => {
    //   onMessageCallback(JSON.parse(event.data));
    // };
  
    // socket.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };
  
    // return socket;
  };
  
  export { WebsocketService };
  