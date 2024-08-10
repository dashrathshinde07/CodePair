// Overview:
// This code sets up a basic server using Express and Socket.IO to enable real-time communication between clients.
// It manages user connections, allows users to join rooms, and broadcasts user data to all clients in a room.

const { Server } = require("socket.io"); // Import the Server class from the socket.io package for real-time communication.
const express = require("express"); // Import the Express framework.
const app = express(); // Create an Express application instance.
const http = require("http"); // Import the Node.js HTTP module.
const ACTIONS = require("./src/actions"); // Import action types from an external file to standardize event names.

const server = http.createServer(app); // Create an HTTP server using the Express app.
const io = new Server(server); // Initialize a new Socket.IO server instance using the HTTP server.

const userSocketMap = {}; // An object to map socket IDs to usernames. This keeps track of which user is connected to which socket.

function getAllConnectedClients(roomId) {
  // This function returns an array of all connected clients in a given room.
  
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId, // The socket ID of the connected client.
        username: userSocketMap[socketId], // The username associated with the socket ID.
      };
    }
  );
}

io.on("connection", (socket) => {
  // Listen for a new connection event when a client connects to the server.
  console.log("socket connected", socket.id); // Log the socket ID of the connected client.

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    // Listen for the 'JOIN' action when a user joins a room.
    
    userSocketMap[socket.id] = username; // Map the socket ID to the username.
    socket.join(roomId); // Add the socket to the specified room.

    const clients = getAllConnectedClients(roomId); // Get all clients connected to the room.
    console.log("Clients in room:", clients); // Log the list of clients in the room.

    clients.forEach(({ socketId }) => {
      // For each client in the room, emit a 'JOINED' event with the updated client list.
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients, // Send the updated list of clients.
        username, // The username of the user who just joined.
        socketId: socket.id, // The socket ID of the user who just joined.
      });
    });
  });
});

const PORT = process.env.PORT || 5000; // Define the port to listen on, either from the environment or default to 5000.

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`)); 
// Start the server and listen on the specified port, logging a message once the server is running.
