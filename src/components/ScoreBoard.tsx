import React from "react";

const ScoreBoard = ({ score = 0 }) => {
  return (
    <div className="scoreContent">
      <h3>Your Score</h3>
      <h1 className="font-bold">{score}</h1>
    </div>
  );
};

export default ScoreBoard;
