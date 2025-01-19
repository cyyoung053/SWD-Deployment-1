import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

const App = () => {
    const [notes, setNotes] = useState(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notes"));
        if (!storedNotes || storedNotes.length === 0) {
            const defaultNotes = [
                { id: 1, title: "First Note", content: "This is a sample note." },
                { id: 2, title: "Second Note", content: "Here's another one." }
            ];
            localStorage.setItem("notes", JSON.stringify(defaultNotes));
            return defaultNotes;
        }
        return storedNotes;
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <main id="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Notes notes={notes} />} />
                    <Route
                        path="/create"
                        element={<Create setNotes={setNotes} />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<Edit notes={notes} setNotes={setNotes} />}
                    />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default App;
