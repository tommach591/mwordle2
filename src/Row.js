import "./css/Row.css";
import Box from "./Box.js";

function Row({ row, rowColor, rowID }) {
  return (
    <div className="Row">
      {row.map((letter, i) => {
        return (
          <Box
            key={rowID + i.toString()}
            letter={letter}
            boxColor={rowColor[i]}
            boxID={rowID + i.toString()}
          />
        );
      })}
    </div>
  );
}

export default Row;
