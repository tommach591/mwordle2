import "./css/Box.css";

function Box({ letter, boxColor, boxID }) {
  return (
    <div className={boxColor} id={boxID}>
      {letter}
    </div>
  );
}

export default Box;
