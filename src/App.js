// Overview:
// This is the main application component that sets up routing and toast notifications.

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right" // Position of toast notifications
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88', // Color for success notifications
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route> {/* Home route */}
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route> {/* Editor route with dynamic roomId */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
