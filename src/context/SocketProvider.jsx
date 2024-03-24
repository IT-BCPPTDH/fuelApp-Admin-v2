import { useState, useEffect, useCallback } from 'react';
import initializedSocket from '../socket';
import PropTypes from 'prop-types';
import SocketContext from './useSocketContext';

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = initializedSocket();
    setSocket(newSocket);

    return () => {
      // if(newSocket){
      //   newSocket.close();
      // }

    };
  }, []);

  const onConnect = useCallback(() => {
    setIsConnected(true);
    // console.log("Connected")
  }, []);

  const onDisconnect = useCallback(() => {
    setIsConnected(false);
    console.log('WebSocket connection closed unexpectedly. Attempting to reconnect...');
    setTimeout(() => {
      const newSocket = initializedSocket();
      setSocket(newSocket);
    }, 3000);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', onConnect);
      socket.addEventListener('close', onDisconnect);

      return () => {
        socket.removeEventListener('open', onConnect);
        socket.removeEventListener('close', onDisconnect);
      };
    }
  }, [socket, onConnect, onDisconnect]);

  const value = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node
};
