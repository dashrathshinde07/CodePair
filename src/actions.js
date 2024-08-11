// Overview:
// This file defines and exports the various actions used in the application for socket communication.

const ACTIONS = {
    JOIN: 'join',              // Action for joining a room
    JOINED: 'joined',          // Action triggered when a user joins
    DISCONNECTED: 'disconnected', // Action for when a user disconnects
    CODE_CHANGE: 'code-change',   // Action for code changes
    SYNC_CODE: 'sync-code',       // Action to sync code with a new user
    LEAVE: 'leave',               // Action for leaving a room
};

module.exports = ACTIONS;
