import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        reconnection: true, // Allow reconnections
        reconnectionAttempts: Infinity, // Try to reconnect indefinitely
        reconnectionDelay: 1000, // Delay between reconnections
        timeout: 10000, // Connection timeout
        transports: ['websocket'], // Use WebSocket transport
    };

    try {
        // Ensure the backend URL is set
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl) {
            throw new Error('REACT_APP_BACKEND_URL is not defined');
        }

        // Create and return the socket connection
        const socket = io(backendUrl, options);

        // Log successful connection
        socket.on('connect', () => {
            console.log('Successfully connected to server');
        });

        // Handle connection errors
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });

        return socket;
    } catch (error) {
        console.error('Socket initialization error:', error);
        throw error;
    }
};
