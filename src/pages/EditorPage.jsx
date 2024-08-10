// Importing necessary modules and components
import React, { useEffect, useRef, useState } from "react"; // React hooks for state and side effects
import Client from "../components/Client"; // Component to display connected client info
import Editor from "../components/Editor"; // Code editor component
import { initSocket } from "../socket"; // Function to initialize socket connection
import ACTIONS from "../actions"; // Actions (events) for socket communication
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"; // React Router hooks for navigation and URL parameters
import toast from "react-hot-toast"; // Library for displaying notifications

const EditorPage = () => {
  const socketRef = useRef(null); // Ref to hold the socket instance
  const location = useLocation(); // Access location state passed from the previous page
  const { roomId } = useParams(); // Extract roomId from the URL

  const reactNavigator = useNavigate(); // Hook for navigating to different routes
  const [clients, setClients] = useState([]); // State to hold the list of connected clients

  // useEffect to handle component lifecycle
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket(); // Initialize the socket connection
      socketRef.current.on("connect_error", (err) => handleErrors(err)); // Handle connection errors
      socketRef.current.on("connect_failed", (err) => handleErrors(err)); // Handle failed connections

      function handleErrors(e) {
        console.log("socket error", e); // Log the error
        toast.error("Socket connection failed, try again later."); // Show error notification
        reactNavigator("/"); // Navigate to the home page on error
      }

      // Emit the JOIN action to the server with roomId and username
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listen for the JOINED event from the server
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          console.log("Joined event received", { clients, username, socketId }); // Log the event details
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`); // Show success notification for new users
          }
          setClients(clients); // Update the clients state with the received data
        }
      );
    };
    init(); // Call the init function to start socket connection

    // Cleanup function to disconnect socket on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />; // Redirect to the home page if location state is not present
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client
                className="client"
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorwrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
