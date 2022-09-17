import "./css/Keyboard.css";
import Key from "./Key.js";
import OtherKey from "./OtherKey";

function Keyboard({ keyColor }) {
  const TopRow = "QWERTYUIOP";
  const MidRow = "ASDFGHJKL";
  const BotRow = "ZXCVBNM";
  return (
    <div className="Keyboard">
      <div className="KeyboardRow">
        {TopRow.split("").map((e) => {
          return <Key key={e} letter={e} keyColor={keyColor} />;
        })}
      </div>
      <div className="KeyboardRow">
        {MidRow.split("").map((e) => {
          return <Key key={e} letter={e} keyColor={keyColor} />;
        })}
      </div>
      <div className="KeyboardRow">
        <OtherKey letters={"Enter"} />
        {BotRow.split("").map((e) => {
          return <Key key={e} letter={e} keyColor={keyColor} />;
        })}
        <OtherKey letters={"Back"} />
      </div>
    </div>
  );
}

export default Keyboard;
