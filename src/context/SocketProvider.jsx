import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import initializedSocket from '../socket';
import PropTypes from 'prop-types'

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = initializedSocket(); 
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const onConnect = useCallback(() => {
    setIsConnected(true);
  }, []);

  const onDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
        // socket.on('update', onFooEvent);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        // socket.off('update', onFooEvent);
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

SocketProvider.propTypes={
    children: PropTypes.any
}