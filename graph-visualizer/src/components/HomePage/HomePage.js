import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate(); // Хук для навігації між сторінками

    return (
        <div className="home-container">
            <div className="card" onClick={() => navigate("/graph")}>
                <h3>Your Graph Algorithm</h3>
                <button>Start</button>
            </div>
            <div className="card" onClick={() => navigate("/data-structure")}>
                <h3>Your Data Structure</h3>
                <button>Start</button>
            </div>
        </div>
    );
};

export default HomePage;
