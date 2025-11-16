import React from "react";
import { useGame } from "./GameContext";
import { useTheme } from "../../../context/useTheme.js";
import styles from "./Card.module.css";

const Card = ({ card }) => {
  const { state, dispatch } = useGame();
  const { theme } = useTheme();

  const isMatched = state.matched.includes(card.id);
  const isFlipped = state.flipped.includes(card.id) || isMatched;

  const handleClick = () => {
    if (isFlipped) return;
    dispatch({ type: "FLIP_CARD", payload: card.id });
  };

  const frontClass =
    theme === "dark" ? styles["front-dark"] : styles["front-light"];

  return (
    <div
      className={[
        styles.card,
        isFlipped ? styles.flipped : "",
        "w-full aspect-square",
        "cursor-pointer",
      ].join(" ")}
      onClick={handleClick}
    >
      <div className={styles.inner}>
        <div
          className={`${styles.face} ${frontClass} ${
            isMatched ? styles.matched : ""
          }`}
        >
          ?
        </div>
        <div
          className={`${styles.face} ${styles.back} ${
            isMatched ? styles.matched : ""
          }`}
        >
          {card.value}
        </div>
      </div>
    </div>
  );
};

export default Card;
