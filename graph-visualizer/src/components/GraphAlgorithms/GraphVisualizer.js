import React, { useState, useRef } from "react";
import Graph from "react-graph-vis";
import { tarjanSCC } from "./tarjanAlgorithm";
import "./GraphVisualizer.css";
import { useNavigate } from "react-router-dom";

const GraphVisualizer = () => {
    const [graphData, setGraphData] = useState({
        nodes: [
            { id: 0, label: "0", color: "#97C2FC" },
            { id: 1, label: "1", color: "#97C2FC" },
            { id: 2, label: "2", color: "#97C2FC" },
            { id: 3, label: "3", color: "#97C2FC" },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 0 },
            { from: 1, to: 3 },
        ],
    });

    const [nodeIdCounter, setNodeIdCounter] = useState(4); // Лічильник ID
    const [scc, setScc] = useState([]);
    const [currentTraversal, setCurrentTraversal] = useState([]);
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    const options = {
        layout: {
            hierarchical: false,
        },
        edges: {
            color: "#000000",
        },
        physics: {
            enabled: true,
        },
    };

    // Знаходимо компоненти сильної зв'язаності
    const findSCC = () => {
        const components = tarjanSCC(graphData.nodes, graphData.edges);
        setScc(components);
        setCurrentTraversal(components.flat());
    };

    // Генеруємо матрицю суміжності
    const generateAdjacencyMatrix = () => {
        const size = graphData.nodes.length;
        const matrix = Array(size)
            .fill(null)
            .map(() => Array(size).fill(0));

        graphData.edges.forEach(({ from, to }) => {
            matrix[from][to] = 1;
        });

        return matrix;
    };

    // Початок обходу
    const startTraversal = () => {
        if (!isPlaying && currentTraversal.length > 0) {
            setIsPlaying(true);
            setCurrentNodeIndex(0);
            intervalRef.current = setInterval(() => {
                setGraphData((prevData) => {
                    const updatedNodes = prevData.nodes.map((node) => ({
                        ...node,
                        color: node.id === currentTraversal[currentNodeIndex] ? "#FF0000" : "#97C2FC",
                    }));
                    return { ...prevData, nodes: updatedNodes };
                });

                setCurrentNodeIndex((prevIndex) => {
                    if (prevIndex < currentTraversal.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(intervalRef.current);
                        setIsPlaying(false);
                        return prevIndex;
                    }
                });
            }, 1000);
        }
    };

    const stopTraversal = () => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
    };

    // Додаємо вершину
    const addNode = () => {
        setGraphData((prevData) => {
            const newId = nodeIdCounter;
            setNodeIdCounter(newId + 1); // Оновлюємо лічильник

            return {
                ...prevData,
                nodes: [...prevData.nodes, { id: newId, label: `${newId}`, color: "#97C2FC" }],
            };
        });
    };

    // Видаляємо вершину
    const deleteNode = (idToDelete) => {
        setGraphData((prevData) => {
            const newNodes = prevData.nodes.filter((node) => node.id !== idToDelete);
            const newEdges = prevData.edges.filter(
                (edge) => edge.from !== idToDelete && edge.to !== idToDelete
            );

            return { nodes: newNodes, edges: newEdges };
        });
    };

    return (
        <div className="graph-visualizer">
            <h2>Graph Visualizer</h2>
            <Graph
                graph={graphData}
                options={options}
                style={{ height: "500px" }}
            />
            <div className="button-container">
                <button onClick={startTraversal} className="control-button">
                    Start
                </button>
                <button onClick={stopTraversal} className="control-button">
                    Stop
                </button>
                <button onClick={addNode} className="control-button">
                    Add Node
                </button>
                <button
                    onClick={() => {
                        const idToDelete = parseInt(prompt("Enter node ID to delete:"));
                        if (!isNaN(idToDelete)) deleteNode(idToDelete);
                    }}
                    className="control-button"
                >
                    Delete Node
                </button>
                <button onClick={() => navigate("/")} className="control-button">
                    Home
                </button>
            </div>
            <button onClick={findSCC} className="find-scc-button">
                Find Strongly Connected Components
            </button>
            {scc.length > 0 && (
                <div className="scc-result">
                    <h3>Strongly Connected Components:</h3>
                    <ul>
                        {scc.map((component, index) => (
                            <li key={index}>
                                Component {index + 1}: {component.join(", ")}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="matrix-result">
                <h3>Adjacency Matrix:</h3>
                <table>
                    <tbody>
                        {generateAdjacencyMatrix().map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GraphVisualizer;
