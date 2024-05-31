import { useContext, useEffect, useState } from "react";
import QuizContext from "./QuizContext";
import { FaFacebook, FaFacebookMessenger, FaGithub } from "react-icons/fa6";



function Results() {
  const { questions, userChoices, numQuestions, difficulty, category, type } =
    useContext(QuizContext);
  const [name, setName] = useState("");


  /* window.onpopstate = () => {
    navigate("/");
  }; */
  
  // Calculate the user's score
  const score = Object.keys(userChoices).reduce((score, key) => {
    const question = questions[key];
    if (question.correct_answer === userChoices[key]) {
      return score + 1;
    }
    return score;
  }, 0);

  const categoryNames = {
    9: "General Knowledge",
    10: "Books",
    11: "Film",
    12: "Music",
    13: "Musicals & Theatres",
    14: "Television",
    15: "Video Games",
    16: "Board Games",
    17: "Science & Nature",
    18: "Computers",
    19: "Mathematics",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
    29: "Comics",
    30: "Gadgets",
    31: "Japanese Anime & Manga",
    32: "Cartoon & Animations",
    any: "Any Category",
  };

  // Calculate passing percentage
  const passingPercentage = 70;
  const scorePercentage = (score / questions.length) * 100;

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <main className="flex flex-col bg-[#00403d] w-full min-h-screen font-poppins items-center">
      {/* <h1>
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
      </div> */}

      <div className="flex flex-col items-center gap-8 w-full h-auto m-10">
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="text-2xl md:text-4xl font-bold text-custom-gray ">
            Your Score <span className="text-[#ff9209]">{name}</span> is:
          </span>
          <span className="text-6xl md:text-7xl font-bold text-[#ff9209]">
            {score}/{questions.length}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="flex justify-center w-full text-LG md:text-2xl font-bold text-custom-gray">
            Quiz Settings:
          </span>
          <div className="flex flex-col w-full text-sm lg:text-md lg:flex-row lg:flex-wrap gap-2 lg:justify-center px-8 md:px-32 text-center">
            <div className="w-full lg:w-[45%] bg-[#0a5a62] rounded-lg p-3">
              <span className="font-bold text-custom-gray">
                Number of Questions:{" "}
              </span>
              <span className="font-bold text-[#ff9209] ">{numQuestions}</span>
            </div>
            <div className="w-full lg:w-[45%] bg-[#0a5a62] rounded-lg p-3">
              <span className="font-bold text-custom-gray">Category: </span>
              <span className="font-bold text-[#ff9209] ">
                {categoryNames[category]}
              </span>
            </div>
            <div className="w-full lg:w-[45%] bg-[#0a5a62] rounded-lg p-3">
              <span className="font-bold text-custom-gray">Difficulty: </span>
              <span className="font-bold text-[#ff9209] ">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            <div className="w-full lg:w-[45%] bg-[#0a5a62] rounded-lg p-3">
              <span className="font-bold text-custom-gray">
                Type of Questions:{" "}
              </span>
              <span className="font-bold text-[#ff9209] ">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          </div>
          <span className="text-xl md:text-3xl font-bold text-custom-gray text-center p-6 pt-8 ">
            {scorePercentage >= passingPercentage
              ? "Congratulations! You reached the passing score.  🎉👏🥳🎉"
              : "You did not reach the passing score. Better luck next time! 🥚😔"}
          </span>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:pt-2 lg:pt-20 px-8 justify-center">
            <button
              className="bg-[#ffd099] md:w-[30%] w-full text-[#00403d] rounded-md p-2 md:p-2 font-bold text-lg md:text-xl"
              onClick={() => {
                
              }}
            >
              Review Answers
            </button>
            <button
              className="bg-[#ffd099] md:w-[30%] w-full text-[#00403d] rounded-md p-2 md:p-2 font-bold text-lg md:text-xl"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full h-1/6 bg-[#0a5a62] ">
        <div className="flex items-center flex-col md:flex-row  justify-between w-full h-full p-3 md:px-20">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-xl font-bold text-custom-gray">
              Follow me: @jltdev
            </span>
            <div className="flex flex-row gap-4">
              <a href="">
                <FaFacebook className="size-8 text-custom-gray" />
              </a>
              <a href="">
                <FaFacebookMessenger className="size-8 text-custom-gray" />
              </a>
              <a href="">
                <FaGithub className="size-8 text-custom-gray" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-semibold text-md md:text-lg text-custom-gray">
              © 2024 Quizvia. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Results;
