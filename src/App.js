import React from "react";
import Home from "./pages/nav-pages/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import Exercices from "./pages/nav-pages/Exercices";
import Shop from "./pages/nav-pages/Shop";
import Workout from "./pages/workout/Workout";
import Nav from "./components/Nav";
import Preferences from "./pages/nav-pages/Preferences";
import WorkoutCompleted from "./pages/workout/WorkoutCompleted";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route index element={<Home />} />
                    <Route path="exercices" element={<Exercices />} />
                    <Route path="preferences" element={<Preferences />} />
                    <Route path="shop" element={<Shop />} />
                </Route>
                <Route path="/workout" element={<Workout />} />
                <Route path="/workout-completed" element={<WorkoutCompleted />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
