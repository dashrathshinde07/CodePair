// Overview:
// This component sets up and manages a CodeMirror-based code editor with real-time collaboration features.
// It initializes the CodeMirror editor, listens for changes in the code, and handles real-time synchronization
// of code changes across clients using Socket.io.

import React, { useEffect, useRef } from 'react';     // Import React library and necessary hooks
import Codemirror from 'codemirror';                 // Import Codemirror for code editing capabilities
import 'codemirror/lib/codemirror.css';              // Import default Codemirror styles
import 'codemirror/theme/dracula.css';               // Import Dracula theme for Codemirror
import 'codemirror/mode/javascript/javascript';      // Import JavaScript mode for syntax highlighting
import 'codemirror/addon/edit/closetag';             // Import addon to auto-close HTML tags
import 'codemirror/addon/edit/closebrackets';        // Import addon to auto-close brackets
import ACTIONS from '../Actions';                    // Import action constants for Socket.io events

// Editor component initializes the code editor and handles real-time code synchronization
const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);  // Create a ref to store the editor instance

    // useEffect to initialize the CodeMirror editor when the component mounts
    useEffect(() => {
        async function init() {
            // Initialize CodeMirror on the textarea with specific options
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'), // Target the textarea by ID
                {
                    mode: { name: 'javascript', json: true }, // Set the mode to JavaScript with JSON support
                    theme: 'dracula',                         // Set the editor theme to Dracula
                    autoCloseTags: true,                     // Enable auto-closing of HTML tags
                    autoCloseBrackets: true,                 // Enable auto-closing of brackets
                    lineNumbers: true,                       // Display line numbers in the editor
                }
            );

            // Event listener for detecting changes in the code editor
            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;                // Get the origin of the change
                const code = instance.getValue();          // Get the current code from the editor
                onCodeChange(code);                        // Notify parent component of the code change
                if (origin !== 'setValue') {               // Check if the change was user-generated
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, { // Emit the code change event via Socket.io
                        roomId,                             // Include the room ID for the event
                        code,                               // Include the updated code
                    });
                }
            });
        }
        init(); // Call the init function to initialize the editor
    }, []);

    // useEffect to handle incoming code changes from the Socket.io server
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {                      // Check if the received code is not null
                    editorRef.current.setValue(code);     // Update the editor with the received code
                }
            });
        }

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);   // Remove the code change event listener
        };
    }, [socketRef.current]);

    // Render a textarea that will be transformed into the CodeMirror editor
    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor; // Export the Editor component for use in other parts of the application
