import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import GraphVisualizer from "./components/GraphAlgorithms/GraphVisualizer";
import DataVisualizer from "./components/DataStructureVisualization/DataVisualizer"; // Додано правильний шлях

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header className="header" />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/graph" element={<GraphVisualizer />} />
                        <Route path="/data-structure" element={<DataVisualizer />} /> {/* Виправлено */}
                    </Routes>
                </main>
                <Footer className="footer" />
            </div>
        </Router>
    );
}

export default App;
