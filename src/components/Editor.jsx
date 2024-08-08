import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark"; 
import { closeBrackets } from "@codemirror/autocomplete";

const Editor = () => {
  const editorRef = useRef(null); // Create a ref for the editor

  useEffect(() => {
    if (editorRef.current) {
      const editor = new EditorView({
        state: EditorState.create({
          doc: "",
          extensions: [
            basicSetup,
            javascript(),
            oneDark,
            closeBrackets(),
          ],
        }),
        parent: editorRef.current, // Attach to the div via ref
      });

      // Clean up the editor on component unmount
      return () => {
        editor.destroy();
      };
    }
  }, []);

  return <div ref={editorRef}></div>; // Use the ref to connect the div
};

export default Editor;
