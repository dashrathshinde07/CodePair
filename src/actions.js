/*
  SUMMARY:
  This file defines a set of constants that represent various actions in a 
  collaborative coding environment. These actions include joining a session, 
  notifying when a user has joined or left, handling code changes, and syncing 
  code across users. The ACTIONS object is exported for use in other parts 
  of the application.
*/

// Define an object to hold action types for the collaborative environment
const ACTIONS = {
    // Action for when a user wants to join a session
    JOIN: "join",
  
    // Action sent when a user has successfully joined a session
    JOINED: "joined",
  
    // Action for when a user disconnects from the session
    DISCONNECTED: "disconnected",
  
    // Action for when there is a change in the code (e.g., typing)
    CODE_CHANGE: "code-change",
  
    // Action for syncing the code with other users in the session
    SYNC_CODE: "sync-code",
  
    // Action for when a user leaves the session
    LEAVE: "leave",
  };
  
  // Export the ACTIONS object so it can be used in other files
  module.exports = ACTIONS;
  