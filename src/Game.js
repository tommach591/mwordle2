import "./css/Game.css";
import Board from "./Board.js";
import Answer from "./Answer.js";
import Keyboard from "./Keyboard.js";
import { getRandomWord, isWord } from "./Dictionary.js";
import { useState, useEffect, useCallback } from "react";

function Game() {
  const [board, setBoard] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [answer, setAnswer] = useState(getRandomWord());
  const [done, setDone] = useState(false);

  const HandleAlphabet = useCallback(
    (key) => {
      var r = row;
      var c = column;
      if (c <= 4) {
        board[r][c] = key.toUpperCase();
        c++;
        setColumn(c);
        setBoard(board);
      }
    },
    [board, row, column]
  );

  const ResetGame = useCallback(() => {
    setBoard([
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]);
    setRow(0);
    setColumn(0);
    setDone(false);
    setAnswer(getRandomWord());

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        var box = document.getElementById(`${i}${j}`);
        box.style.backgroundColor = "white";
        box.style.borderColor = "black";
        box.style.color = "black";
      }
    }

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((e) => {
      var box = document.getElementById(e);
      box.style.backgroundColor = "rgb(230, 230, 230)";
      box.style.color = "black";
    });
    var answerBox = document.getElementById("Answer");
    answerBox.style.backgroundColor = "white";
  }, []);

  const CheckWord = useCallback(
    (r) => {
      var isCorrect = true;
      var word = answer.toUpperCase();
      for (let i = 0; i < 5; i++) {
        var box = document.getElementById(`${r}${i}`);
        var letter = document.getElementById(board[r][i]);
        box.style.color = "white";
        if (board[r][i] === word[i]) {
          box.style.backgroundColor = "forestgreen";
          box.style.borderColor = "forestgreen";
          letter.style.backgroundColor = "forestgreen";
          letter.style.color = "white";
        } else if (word.includes(board[r][i])) {
          box.style.backgroundColor = "goldenrod";
          box.style.borderColor = "goldenrod";
          if (letter.style.backgroundColor !== "forestgreen") {
            letter.style.backgroundColor = "goldenrod";
            letter.style.color = "white";
          }
          isCorrect = false;
        } else {
          box.style.backgroundColor = "gray";
          box.style.borderColor = "gray";
          letter.style.backgroundColor = "gray";
          letter.style.color = "white";
          isCorrect = false;
        }
      }
      return isCorrect;
    },
    [board, answer]
  );

  const HandleEnter = useCallback(() => {
    var r = row;
    var c = column;
    var d = done;

    if (c === 5 && isWord(board[r].join("").toLowerCase())) {
      c = 0;
      var correct = CheckWord(r);
      if (correct || r >= 5) {
        d = true;
        var answerBox = document.getElementById("Answer");
        answerBox.style.color = "white";
        if (correct) {
          answerBox.style.backgroundColor = "forestgreen";
        } else {
          answerBox.style.backgroundColor = "gray";
        }
      }
      if (r < 6) r++;
      setBoard(board);
      setRow(r);
      setColumn(c);
      setDone(d);
    } else {
      alert("Not a valid word.");
    }
  }, [board, row, column, done, CheckWord]);

  const HandleBackspace = useCallback(() => {
    var r = row;
    var c = column;
    if (c >= 0) {
      if (c > 0) c--;
      board[r][c] = null;
      setColumn(c);
      setBoard(board);
    }
  }, [board, row, column]);

  const HandleKeyPress = useCallback(
    (event) => {
      const { key, keyCode } = event;
      if (done) {
        ResetGame();
      } else {
        if (key === "Enter") {
          HandleEnter();
        } else if (key === "Backspace") {
          HandleBackspace();
        } else if (keyCode >= 65 && keyCode <= 90) {
          HandleAlphabet(key.toUpperCase());
        }
      }
    },
    [HandleAlphabet, HandleBackspace, HandleEnter, ResetGame, done]
  );

  useEffect(() => {
    window.addEventListener("keydown", HandleKeyPress);
    return () => {
      window.removeEventListener("keydown", HandleKeyPress);
    };
  }, [HandleKeyPress]);

  return (
    <div>
      <div className="Header">
        <h1 className="Title">My Wordle 2</h1>
      </div>
      <Answer answer={answer} />
      <Board board={board} />
      <Keyboard />
    </div>
  );
}

export default Game;
