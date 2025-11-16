import React from "react";
import { useGameStats } from "./GameContext";
import Card from "./Card";
import { generateCards } from "./GameContext";
import { useGame } from "./GameContext";
import { useTheme } from "../../../context/useTheme.js";

const GameBoard = () => {
  const { state, dispatch } = useGame();
  const { moves, score, isGameOver } = useGameStats();
  const { theme } = useTheme();

  const handleReset = () => {
    dispatch({ type: "RESET" });
    const newCards = generateCards();
    dispatch({ type: "SET_CARDS", payload: newCards });
  };

  const containerClass = `p-0 sm:p-4 rounded-lg shadow-md border w-full ${
    theme === "dark"
      ? "bg-[#1e1e1e] border-gray-700 text-white"
      : "bg-[#ecf3f4] border-gray-300 text-black"
  }`;

  const buttonClass = `mt-1 !mb-8 px-5 !py-2.5 font-medium !rounded-lg transition-colors duration-200 ${
    theme === "dark"
      ? "bg-[#094857] hover:bg-[#0a5c6e] text-white"
      : "bg-[#0a5c6e] hover:bg-[#0c6b80] text-white"
  }`;

  return (
    <div className={containerClass}>
      <div className="game-inner-wrapper flex justify-center mx-auto flex-col items-center">
        <div className="text-center mb-8">
          <p className="text-lg">
            Moves: <span className="font-semibold">{moves}</span> | Score:{" "}
            <span className="font-semibold">{score}</span>
          </p>
          <button className={buttonClass} onClick={handleReset}>
            Restart Game
          </button>
        </div>
        {isGameOver ? (
          <div className="inset-50 z-50 flex items-center justify-center rounded-2xl bg-black/10">
            <div
              className={`w-[80%] max-w-[500px] !p-6 !m-10 rounded-xl shadow-xl text-center animate-fade-in
      ${theme === "dark" ? "bg-[#1e1e1e] text-white" : "bg-white text-black"}`}
            >
              <h2 className="text-3xl font-bold !my-4">🎉 Congratulations!</h2>
              <p className="text-lg">You matched all cards</p>
            </div>
          </div>
        ) : (
          <div className="w-[100%] sm:w-[70%] max-w-[1600px] mx-auto grid grid-cols-4 gap-2 memory-grid">
            {state.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
