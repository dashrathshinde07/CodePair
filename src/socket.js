// Overview:
// This code sets up a Socket.IO client connection to a server. It exports an asynchronous function `initSocket` 
// which initializes and returns a Socket.IO client instance configured with specific options.

import { io } from "socket.io-client"; // Import the `io` function from the `socket.io-client` package to establish a WebSocket connection.

export const initSocket = async () => {
  // Asynchronous function to initialize the Socket.IO client.

  const options = {
    "force new connection": true, // Option to force a new connection to the server, even if one already exists.
    reconnectionAttempts: "Infinity", // Set the number of reconnection attempts to infinite, meaning it will keep trying to reconnect indefinitely if disconnected.
    timeout: 10000, // Set the connection timeout to 10,000 milliseconds (10 seconds). If the client cannot connect within this time, it will fail.
    transports: ["websocket"], // Specify that WebSocket is the only transport method to be used for communication.
  };

  // Return the Socket.IO client instance initialized with the specified options.
  return io(process.env.REACT_APP_BACKEND_URL, options); 
  // `process.env.REACT_APP_BACKEND_URL` should contain the URL of the backend server to which the client will connect.
};
