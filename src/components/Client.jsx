import React from 'react';
import Avatar from 'react-avatar';

/**
 * Client component displays a user with their avatar and username.
 * 
 * Props:
 * - username (string): The name of the user.
 */
const Client = ({ username }) => {
    return (
        <div className="client">
            <Avatar name={username} size={50} round="14px" />
            <span className="userName">{username}</span>
        </div>
    );
};

export default Client;
