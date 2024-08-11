// Overview:
// This function initializes a new Socket.IO client connection with specific options.

import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true, // Always create a new connection
        reconnectionAttempt: 'Infinity', // Retry forever if connection fails
        timeout: 10000, // Connection timeout set to 10 seconds
        transports: ['websocket'], // Use WebSocket as the transport protocol
    };
    return io(process.env.REACT_APP_BACKEND_URL, options); // Connect to the backend URL
};
