import { useEffect, useState } from "react";
import blueCandy from "./assets/blue-candy.png";
import greenCandy from "./assets/green-candy.png";
import orangeCandy from "./assets/orange-candy.png";
import purpleCandy from "./assets/purple-candy.png";
import redCandy from "./assets/red-candy.png";
import yellowCandy from "./assets/yellow-candy.png";
import blank from "./assets/blank.png";
import { boardSize } from "./constants";
import candyCrush from "./assets/bk5.jpeg";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<
    string[]
  >([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<any>({});
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<any>({});
  const [score, setScore] = useState<number>(0);
  const candyColor: string[] = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy,
  ];
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + boardSize, i + boardSize * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // 3 cols match
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        setScore(score + 3);
        return true;
      }
    }
  };
  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [
        i,
        i + boardSize,
        i + boardSize * 2,
        i + boardSize * 3,
      ];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // 4 cols match
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        setScore(score + 4);
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      // remove last 2 tiles from array of every row
      const notValidTile = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];
      if (notValidTile.includes(i)) continue;
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // 3 cols match
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        setScore(score + 3);
        return true;
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const notValidTile = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 61, 62, 63,
      ];
      if (notValidTile.includes(i)) continue;
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // 4 cols match
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        setScore(score + 4);
        return true;
      }
    }
  };

  const moveSquaresBelow = () => {
    for (let i = 0; i < 64 - boardSize; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomColor = Math.floor(Math.random() * candyColor.length);
        currentColorArrangement[i] = candyColor[randomColor];
      }
      if (currentColorArrangement[i + boardSize] === blank) {
        currentColorArrangement[i + boardSize] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e: any) => {
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e: any) => {
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e: any) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - boardSize,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + boardSize,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < boardSize * boardSize; i++) {
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColor.length
      );
      const randomColor = candyColor[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
      setCurrentColorArrangement(randomColorArrangement);
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveSquaresBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveSquaresBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="h-[580px] flex p-30 justify-center">
      <img
        src={candyCrush}
        alt=""
        className="w-24 h-24 relative right-[250px] top-4"
      />
      <div className="w-[480px] h-[480px] flex flex-wrap mt-16 bg-[#a0acbc80] shadow-gray-500 p-4 mr-16">
        {currentColorArrangement.map((candyColor: string, index: number) => (
          <>
            <img
              key={index}
              className="w-[55px] h-[55px]"
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          </>
        ))}
      </div>
      <ScoreBoard score={score} />
    </div>
  );
}

export default App;
