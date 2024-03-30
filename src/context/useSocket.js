import { useContext } from "react";
import SocketContext from "./useSocketContext";
export const useSocket = () => useContext(SocketContext);