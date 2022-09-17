import "./css/Board.css";
import Row from "./Row.js";

function Board({ board, boardColor }) {
  return (
    <div className="Board">
      {board.map((row, i) => {
        return (
          <Row
            key={i.toString()}
            row={row}
            rowColor={boardColor[i]}
            rowID={i.toString()}
          />
        );
      })}
    </div>
  );
}

export default Board;
