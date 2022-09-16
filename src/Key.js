import "./css/Key.css";

function Key({ letter }) {
  return (
    <div className="Key" id={letter}>
      {letter}
    </div>
  );
}

export default Key;
