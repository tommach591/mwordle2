import "./css/Board.css";
import Row from "./Row.js";

function Board({ board }) {
  return (
    <div className="Board">
      {board.map((row, i) => {
        return <Row key={i.toString()} row={row} rowID={i.toString()} />;
      })}
    </div>
  );
}

export default Board;
