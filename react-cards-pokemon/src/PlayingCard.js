import React from "react";
import {useFlip} from "./hooks";
import backOfCard from "./back.png";
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, setIsFacingUp] = useFlip(true);
  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={setIsFacingUp}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
