import "./css/Answer.css";

function Answer({ answer }) {
  return (
    <div className="AnswerBox">
      <div className="Answer" id="Answer">
        {answer}
      </div>
    </div>
  );
}

export default Answer;
