import React, { useEffect, useState } from "react";
import { SparklesCore } from "../components/ui/sparkles";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";

export default function App() {
    const [characters, setCharacters] = useState([]);
    const [selected, setSelected] = useState(null);
    const [votes, setVotes] = useState({});
    const [hasVoted, setHasVoted] = useState(false);
    const [barColors, setBarColors] = useState([]);

    const particlesInit = async (engine) => {
        await loadSlim(engine);
        await loadExternalTrailInteraction(engine);
    };

    useEffect(() => {
        const initialCharacters = [
            { id: 1, name: "Mickey Mouse" },
            { id: 2, name: "Buzz Lightyear" },
            { id: 3, name: "Elsa" },
        ];
        setCharacters(initialCharacters);

        const initialVotes = {};
        const colors = [];

        initialCharacters.forEach((char) => {
            initialVotes[char.name] = 0;
            colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        });

        setVotes(initialVotes);
        setBarColors(colors);
    }, []);

    const handleVote = () => {
        if (selected) {
            setVotes((prevVotes) => ({
                ...prevVotes,
                [selected.name]: prevVotes[selected.name] + 1,
            }));
            setHasVoted(true);
        }
    };

    const handleReset = () => {
        setSelected(null);
        setHasVoted(false);
    };

    const chartData = {
        labels: characters.map((char) => char.name),
        datasets: [
            {
                label: "Votes",
                data: characters.map((char) => votes[char.name]),
                backgroundColor: barColors,
                borderColor: "#6B21A8",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex items-center justify-center relative z-10">
            <div className="fixed inset-0 -z-10">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor={[
                        "#FF0000",
                        "#FF7F00",
                        "#FFFF00",
                        "#00FF00",
                        "#0000FF",
                        "#4B0082",
                        "#9400D3",
                    ]}
                />
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    className="absolute inset-0 -z-10"
                    options={{
                        background: { color: "transparent" },
                        fpsLimit: 60,
                        interactivity: {
                            events: { onHover: { enable: true, mode: "trail" }, resize: true },
                            modes: {
                                trail: {
                                    delay: 0.2,
                                    quantity: 5,
                                    particles: {
                                        color: {
                                            value: [
                                                "#FF0000",
                                                "#FF7F00",
                                                "#FFFF00",
                                                "#00FF00",
                                                "#0000FF",
                                                "#4B0082",
                                                "#9400D3",
                                            ],
                                        },
                                        move: {
                                            speed: 5,
                                            outModes: { default: "destroy" },
                                        },
                                        size: { value: 4 },
                                        opacity: { value: 1 },
                                    },
                                },
                            },
                        },
                        particles: {
                            number: { value: 0 },
                            move: { enable: true, speed: 2 },
                            color: { value: "#ffffff" },
                        },
                    }}
                />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center relative z-10">
                {!hasVoted ? (
                    <>
                        <h1 className="text-2xl font-bold mb-6 text-purple-700">
                            Vote for Your Favorite Disney Character
                        </h1>
                        <form className="space-y-4">
                            {characters.map((char) => (
                                <div key={char.id} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        id={`char-${char.id}`}
                                        name="character"
                                        className="h-5 w-5 text-purple-600"
                                        onChange={() => setSelected(char)}
                                    />
                                    <label htmlFor={`char-${char.id}`} className="text-black">
                                        {char.name}
                                    </label>
                                </div>
                            ))}
                        </form>
                        <button
                            onClick={handleVote}
                            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold"
                            disabled={!selected}
                        >
                            Submit Vote
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-6 text-purple-700">
                            Voting Results
                        </h1>
                        <Bar data={chartData} />
                        <button
                            onClick={handleReset}
                            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold"
                        >
                            Vote Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
