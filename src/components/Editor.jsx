import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

/**
 * Editor component for real-time code editing with CodeMirror.
 * 
 * Props:
 * - socketRef (object): Reference to the socket connection.
 * - roomId (string): The ID of the room.
 * - onCodeChange (function): Callback function to handle code changes.
 */
const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        const init = () => {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: 'javascript',
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);

                if (origin !== 'setValue') {
                    console.log('Emitting code change:', code);
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        };
        init();

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
            }
        };
    }, [socketRef, roomId, onCodeChange]);

    useEffect(() => {
        const socket = socketRef.current;

        if (socket) {
            socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                console.log('Received code change:', code);
                if (code !== editorRef.current.getValue()) {
                    editorRef.current.setValue(code);
                }
            });

            return () => {
                socket.off(ACTIONS.CODE_CHANGE);
            };
        }
    }, [socketRef, roomId]);

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
