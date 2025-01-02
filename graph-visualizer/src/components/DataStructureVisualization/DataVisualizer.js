import React from "react";
import "./DataVisualizer.css";

const DataVisualizer = () => {
    return (
        <div className="data-container">
            <h1>Data Structure Visualization</h1>
            <div className="controls">
                <button>Start</button>
                <button>Pause</button>
                <button>Next Step</button>
                <button>Previous Step</button>
            </div>
            <div className="data-visualization">
                {/* Тут можна додати специфічну візуалізацію для структури даних */}
                <p>Data Structure will be visualized here</p>
            </div>
        </div>
    );
};

export default DataVisualizer;
