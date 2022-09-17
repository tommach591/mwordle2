import "./css/Key.css";

function Key({ letter, keyColor }) {
  return (
    <div className={keyColor[letter]} id={letter}>
      {letter}
    </div>
  );
}

export default Key;
