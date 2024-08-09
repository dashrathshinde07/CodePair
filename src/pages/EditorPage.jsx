import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../actions";
import { useLocation } from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);

  const location = useLocation();
  // Extracting roomId from the state passed through navigation
  const { roomId } = location.state;

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };
  }, []);

  const [clients, setClients] = useState([
    { socketId: 1, username: "Rakesh K" },
    { socketId: 2, username: "Jhon Doe" },
    { socketId: 3, username: "Jhon Doe2" },
  ]);

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


// import React, { useEffect, useRef, useState } from "react";
// import Client from "../components/Client";
// import Editor from "../components/Editor";
// import { initSocket } from "../socket";
// import ACTIONS from "../actions";
// import { useLocation } from "react-router-dom";

// const EditorPage = () => {
//   const socketRef = useRef(null);
//   const location = useLocation();

//   // Extracting roomId and username from the state passed through navigation
//   const roomId = location.state?.roomId;
//   const username = location.state?.username;

//   useEffect(() => {
//     const init = async () => {
//       if (roomId && username) {
//         socketRef.current = await initSocket();
//         socketRef.current.emit(ACTIONS.JOIN, {
//           roomId,
//           username,
//         });
//       }
//     };

//     init();

//     // Cleanup function to disconnect the socket on component unmount
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [roomId, username]);

//   const [clients, setClients] = useState([
//     { socketId: 1, username: "Rakesh K" },
//     { socketId: 2, username: "Jhon Doe" },
//     { socketId: 3, username: "Jhon Doe2" },
//   ]);

//   return (
//     <div className="mainWrap">
//       <div className="aside">
//         <div className="asideInner">
//           <div className="logo">
//             <img className="logoImage" src="/code-sync.png" alt="logo" />
//           </div>
//           <h3>Connected</h3>
//           <div className="clientsList">
//             {clients.map((client) => (
//               <Client
//                 className="client"
//                 key={client.socketId}
//                 username={client.username}
//               />
//             ))}
//           </div>
//         </div>
//         <button className="btn copyBtn">Copy Room ID</button>
//         <button className="btn leaveBtn">Leave</button>
//       </div>
//       <div className="editorwrap">
//         <Editor />
//       </div>
//     </div>
//   );
// };

// export default EditorPage;
