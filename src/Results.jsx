import { useContext } from "react";
import QuizContext from "./QuizContext";

function Results() {
  const { questions, userChoices } = useContext(QuizContext);

  // Calculate the user's score
  const score = Object.keys(userChoices).reduce((score, key) => {
    const question = questions[key];
    if (question.correct_answer === userChoices[key]) {
      return score + 1;
    }
    return score;
  }, 0);

  return (
    <div className="results-container">
      <h1>
        Your Score: {score} / {questions.length}
      </h1>
      <div className="results-details">
        {questions.map((question, index) => (
          <div key={index} className="question-result">
            <h2>{question.question}</h2>
            <p>
              Your answer: {userChoices[index]} <br />
              Correct answer: {question.correct_answer}
            </p>
            {userChoices[index] === question.correct_answer ? (
              <p style={{ color: "green" }}>Correct</p>
            ) : (
              <p style={{ color: "red" }}>Wrong</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
