/**
 * Overview:
 * This is the Home component for the CodePair project, a collaborative code editor application.
 * This component allows users to either create a new room or join an existing room by entering a Room ID and Username.
 * The component uses React's state management to handle input values and the 'react-hot-toast' library for notifications.
 * Navigation to the editor page is handled using the 'useNavigate' hook from React Router.
 */

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Importing uuid to generate unique IDs for new rooms
import toast from "react-hot-toast"; // Importing toast for displaying notifications
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

const Home = () => {
  const navigate = useNavigate(); // Initializing the useNavigate hook for programmatic navigation
  const [roomId, setRoomId] = useState(""); // State to store the Room ID
  const [userName, setUserName] = useState(""); // State to store the Username

  // Function to create a new room
  const createNewRoom = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const id = uuidv4(); // Generates a unique Room ID
    setRoomId(id); // Updates the roomId state with the generated ID
    toast.success("Created a new Room"); // Displays a success notification
  };

  // Function to join an existing room
  const joinRoom = () => {
    // Checks if Room ID and Username are provided
    if (!roomId || !userName) {
      toast.error("Room ID & username is required"); // Displays an error notification if inputs are missing
      return; // Exits the function if validation fails
    }
    // Redirects to the editor page with the Room ID and Username as state
    navigate(`/editor/${roomId}`, {
      state: {
        userName, // Passes the userName as part of the state to the editor page
      },
    });
  };

  // Function to handle the 'Enter' key press on input fields
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom(); // Calls the joinRoom function when 'Enter' is pressed
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        {/* Displaying the application logo */}
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-pair-logo"
        />
        <h4 className="mainLabel">Paste Invitation Room ID</h4>
        <div className="inputGroup">
          {/* Input field for Room ID */}
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)} // Updates the roomId state with user input
            value={roomId} // Binds the input value to the roomId state
            onKeyUp={handleInputEnter} // Triggers joinRoom on 'Enter' key press
          />
          {/* Input field for Username */}
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUserName(e.target.value)} // Updates the userName state with user input
            onKeyUp={handleInputEnter} // Triggers joinRoom on 'Enter' key press
          />

          {/* Button to join the room */}
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            {/* Link to create a new room */}
            <a onClick={createNewRoom} href="" className="createNewRoomBtn">
              new Room
            </a>
          </span>
        </div>
      </div>

      {/* Footer section with a link to the creator's GitHub profile */}
      <footer>
        <h4>
          Built with ❤️ by{" "}
          <a href="https://github.com/dashrathshinde07">Dashrath</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
