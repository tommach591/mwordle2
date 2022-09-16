import "./css/Box.css";

function Box({ letter, boxID }) {
  return (
    <div className="Box" id={boxID}>
      {letter}
    </div>
  );
}

export default Box;
