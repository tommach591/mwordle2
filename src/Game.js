import "./css/Game.css";
import Board from "./Board.js";
import Answer from "./Answer.js";
import Keyboard from "./Keyboard.js";
import { clearBoard, clearBoardColor, clearKeyColor } from "./Clear";
import { getRandomWord, isWord } from "./Dictionary.js";
import { useState, useEffect, useCallback } from "react";

function Game() {
  const [board, setBoard] = useState(clearBoard());
  const [boardColor, setBoardColor] = useState(clearBoardColor());
  const [keyColor, setKeyColor] = useState(clearKeyColor());
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [answer, setAnswer] = useState([
    getRandomWord().toUpperCase(),
    "AnswerBox",
  ]);
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
    setBoard(clearBoard());
    setBoardColor(clearBoardColor());
    setKeyColor(clearKeyColor());
    setRow(0);
    setColumn(0);
    setDone(false);
    setAnswer([getRandomWord().toUpperCase(), "AnswerBox"]);
  }, []);

  const CheckWord = useCallback(
    (r) => {
      var isCorrect = true;
      var word = answer[0];
      var boardColorCopy = boardColor;
      var keyColorCopy = keyColor;

      var ansKey = {};
      word.split("").forEach((e) => {
        if (!ansKey[e]) ansKey[e] = 1;
        else ansKey[e]++;
      });

      for (let i = 0; i < 5; i++) {
        if (board[r][i] === word[i]) {
          boardColorCopy[r][i] = "GreenBox";
          keyColorCopy[board[r][i]] = "GreenKey";
          ansKey[board[r][i]]--;
        }
      }

      for (let i = 0; i < 5; i++) {
        if (boardColorCopy[r][i] === "Box") {
          if (ansKey[board[r][i]]) {
            boardColorCopy[r][i] = "YellowBox";
            if (keyColorCopy[board[r][i]] !== "GreenKey")
              keyColorCopy[board[r][i]] = "YellowKey";
            ansKey[board[r][i]]--;
            isCorrect = false;
          }
        }
      }

      for (let i = 0; i < 5; i++) {
        if (boardColorCopy[r][i] === "Box") {
          boardColorCopy[r][i] = "GrayBox";
          if (keyColorCopy[board[r][i]] === "Key")
            keyColorCopy[board[r][i]] = "GrayKey";
          isCorrect = false;
        }
      }

      setBoardColor(boardColorCopy);
      setKeyColor(keyColorCopy);
      return isCorrect;
    },
    [board, boardColor, keyColor, answer]
  );

  const HandleEnter = useCallback(() => {
    var r = row;
    var c = column;
    var d = done;
    var ans = answer;

    if (c === 5 && isWord(board[r].join("").toLowerCase())) {
      c = 0;
      var correct = CheckWord(r);
      if (correct || r >= 5) {
        d = true;
        if (correct) {
          ans[1] = "GreenAnswerBox";
        } else {
          ans[1] = "GrayAnswerBox";
        }
      }
      if (r < 6) r++;
      setBoard(board);
      setRow(r);
      setColumn(c);
      setAnswer(ans);
      setDone(d);
    } else {
      alert("Not a valid word.");
    }
  }, [board, row, column, answer, done, CheckWord]);

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
      <Board board={board} boardColor={boardColor} />
      <Keyboard keyColor={keyColor} />
    </div>
  );
}

export default Game;
