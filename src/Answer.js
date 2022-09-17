import "./css/Answer.css";

function Answer({ answer }) {
  return (
    <div className={answer[1]}>
      <div className="Answer" id="Answer">
        {answer[0]}
      </div>
    </div>
  );
}

export default Answer;
