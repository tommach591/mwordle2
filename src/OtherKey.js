import "./css/Key.css";

function OtherKey({ letters }) {
  return (
    <div className="OtherKey" id={letters}>
      {letters}
    </div>
  );
}

export default OtherKey;
