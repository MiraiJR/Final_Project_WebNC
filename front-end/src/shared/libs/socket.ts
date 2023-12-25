import { io } from 'socket.io-client';

const BE_SOCKET_URL = import.meta.env.VITE_BACKEND_URL.replace("/api/v1", "")

export const socketComment = io(BE_SOCKET_URL,{
    autoConnect: false,
    transports : ['websocket'],
});