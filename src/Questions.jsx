import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import toast from "react-hot-toast";
import QuizContext from "./QuizContext";
import PageError from "./pageError";

// Function to decode HTML entities
function decodeHtml(html) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
}

function Questions() {
  const navigate = useNavigate();

  //const [questions, setQuestions] = useState([]);
  const [responseCode, setResponse] = useState();
  const {
    questions,
    setQuestions,
    userChoices,
    setUserChoices,
    numQuestions,
    difficulty,
    category,
    type,
  } = useContext(QuizContext);
  //const [userChoices, setUserChoices] = useState({}); // State for user choices
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isError, setIsError] = useState(false);

  window.onpopstate = () => {
    navigate("/");
    window.location.reload();
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!numQuestions || !difficulty || !category || !type) {
      navigate("/");
      return;
    }
    const fetchQuestions = async (numQuestions, difficulty, category, type) => {
      const params = {
        amount: numQuestions,
        ...(difficulty !== "any" && { difficulty }),
        ...(category !== "any" && { category }),
        ...(type !== "any" && { type }),
      };

      await axios
        .get(`https://opentdb.com/api.php`, { params })
        .then((response) => {
          const decodedQuestions = response.data.results.map((question) => ({
            ...question,
            question: decodeHtml(question.question),
            correct_answer: decodeHtml(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) =>
              decodeHtml(answer)
            ),
            category: decodeHtml(question.category),
          }));
          //console.log(response.data);
          setQuestions(decodedQuestions);
          setResponse(response.data.response_code);
        })
        .catch(() => {
            setIsError(true);
        });
      };

    fetchQuestions(numQuestions, difficulty, category, type);
  }, [numQuestions, difficulty, category, type, setQuestions, navigate]);

  const handleOptionChange = (questionIndex, answer) => {
    setUserChoices((prevChoices) => ({
      ...prevChoices,
      [questionIndex]: answer,
    }));
  };

  const handleNextQuestionOrSubmit = () => {
    if (currentQuestionIndex === questions.length - 1) {
      handleSubmit();
    } else {
      handleNextQuestion();
    }
  };

  const handleSubmit = () => {
    if (userChoices[currentQuestionIndex] !== undefined) {
      //console.log("User Choices:", userChoices);
      navigate("/results");
    } else {
      toast("Choose an answer before proceeding.", {
        icon: "⚠️",
        style: {
          border: "1px solid #e79209",
          color: "#e79209",
          fontWeight: "500",
        },

        iconTheme: {
          primary: "#e79209",
          secondary: "#FFFAEE",
        },
        duration: 3000,
      });
    }
  };

  const handleNextQuestion = () => {
    if (userChoices[currentQuestionIndex] !== undefined) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      toast("Choose an answer before proceeding.", {
        icon: "⚠️",
        style: {
          border: "1px solid #e79209",
          color: "#e79209",
          fontWeight: "500",
        },

        iconTheme: {
          primary: "#e79209",
          secondary: "#FFFAEE",
        },
        duration: 3000,
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateDuration = (difficulty, numQuestions) => {
    switch (difficulty) {
      case "easy":
        return 15 * numQuestions;
      case "medium":
        return 20 * numQuestions;
      case "hard":
        return 25 * numQuestions;
      default:
        return 20 * numQuestions;
    }
  };

  const duration = calculateDuration(difficulty, numQuestions);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = String(remainingTime % 60).padStart(2, "0");
    
    return `${minutes}:${seconds}`;
  };

  const showToast = (remainingTime) => {
    toast(`Remaining time is ${remainingTime} seconds.`, {
      icon: "⚠️",
      style: {
        border: "1px solid #e79209",
        color: "#e79209",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#e79209",
        secondary: "#FFFAEE",
      },
      duration: 5000,
    });
};

  if (isError) {
    return <PageError />; // Render Error component if there's an error
  }

  //console.log(responseCode);

  return (
    <div className="flex flex-col justify-center h-screen bg-[#00403d] flex-grow">
      {responseCode === 1 ? (
        <div className="flex flex-col justify-center items-center gap-6 text-center m-2">
          <h1 className="text-4xl font-bold text-white">
            Error: The API response is failed.
          </h1>
          <p className="text-white text-lg">
            Please adjust your quiz settings and try again.
          </p>
          <button
            className="bg-[#0a5a62] font-semibold text-white px-4 py-2 rounded-md hover:bg-[#e79209] ease-in-out duration-500"
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            Go Back
          </button>
        </div>
      ) : responseCode !== 0 ? (
        <div className="flex flex-col justify-center items-center gap-6 text-center mx-4">
          <h1 className="text-4xl font-bold text-white">Loading...</h1>
          <h1 className="sm:text-xl text-lg font-semibold text-white">
            Quizvia data is from the{" "}
            <a
              className="text-[#bfdbfe] underline"
              href="https://opentdb.com/"
              target="_blank"
            >
              Open Trivia Database.
            </a>
          </h1>
          <h1 className="text-xl font-bold text-[#e0d099]">
            If the loading continues, there could be a temporary problem with
            the data source.
          </h1>
          <p className="text-white text-lg">
            Please wait while we load the questions.
          </p>
          <div className="flex justify-center mt-10 items-center">
            <TailSpin
              visible={true}
              height="150"
              width="150"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center lg:w-7/12 w-11/12 h-[95%] mx-auto bg-white rounded-md">
          <div className="flex flex-row justify-between xs:p-2 p-4 md:p-10 w-full h-32 border-b-2 border-[#00403d]">
            <div className="flex flex-col justify-center items-start xl:gap-2">
              <h1 className="font-bold text-[#00403d] sm:text-xl text-md">
                Type:{" "}
                <span className="text-[#e79209]">
                  {questions[currentQuestionIndex].type
                    .charAt(0)
                    .toUpperCase() +
                    questions[currentQuestionIndex].type.slice(1)}
                </span>
              </h1>
              <h1 className="font-bold text-[#00403d] sm:text-xl text-md">
                Difficulty:{" "}
                <span className="text-[#e79209]">
                  {questions[currentQuestionIndex].difficulty
                    .charAt(0)
                    .toUpperCase() +
                    questions[currentQuestionIndex].difficulty.slice(1)}
                </span>
              </h1>
              <h1 className="font-bold text-[#00403d] sm:text-xl text-md">
                Category:{" "}
                <span className="text-[#e79209]">
                  {questions[currentQuestionIndex].category}
                </span>
              </h1>
            </div>
            <div></div>
            <div className="flex justify-center items-center">
              <h1 className="hidden md:block font-bold text-[#00403d] pr-4 text-xl">
                Remaining Time:
              </h1>
              <CountdownCircleTimer
                isPlaying
                duration={duration}
                colors={["#00403d", "#F7B801", "#ff5659", "#fe0606", "#A30000"]}
                colorsTime={[
                  duration / 2,
                  duration / 3,
                  duration / 4,
                  duration / 5,
                  0,
                ]}
                size={80}
                onUpdate={(remainingTime) => {
                  if (remainingTime === duration / 2) {
                    showToast(remainingTime);
                  } else if (remainingTime === duration / 3) {
                    showToast(remainingTime);
                  } else if (remainingTime === duration / 4) {
                    showToast(remainingTime);
                  } else if (remainingTime === duration / 5) {
                    showToast(remainingTime);
                  } else if (remainingTime === 10) {
                    toast("You have 10 seconds remaining!", {
                      icon: "⚠️",
                      style: {
                        border: "1px solid #ec1f3f",
                        color: "#ec1f3f",
                        fontWeight: "500",
                      },

                      iconTheme: {
                        primary: "#ec1f3f",
                        secondary: "#FFFAEE",
                      },
                      duration: 5000,
                    });
                  } else if (remainingTime === 0) {
                    toast("You ran out of time!", {
                      icon: "😔",
                      style: {
                        border: "1px solid #ec1f3f",
                        color: "#ec1f3f",
                        fontWeight: "500",
                      },

                      iconTheme: {
                        primary: "#ec1f3f",
                        secondary: "#FFFAEE",
                      },
                      duration: 5000,
                    });
                  }
                }}

                onComplete={() => {
                  navigate("/results");
                }}
              >
                {children}
              </CountdownCircleTimer>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center p-4 md:p-8 w-full h-4/5">
            <h1 className="text-md sm:text-2xl lg:text-2xl md:2xl pb-4  font-bold text-[#00403d] text-center">
              {questions[currentQuestionIndex].question}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-4 m-auto w-full"
            >
              {questions[currentQuestionIndex].type === "boolean" ? (
                <>
                  <div
                    className={`flex flex-row w-full px-6 h-14 rounded-md ease-in-out duration-300 hover:cursor-pointer hover:bg-green-200 ${
                      userChoices[currentQuestionIndex] === "True"
                        ? "bg-green-200 border-2 border-green-400"
                        : "bg-gray-200"
                    }`}
                  >
                    <input
                      className="hidden justify-start items-start hover:cursor-pointer"
                      type="radio"
                      id={`true-${currentQuestionIndex}`}
                      name={`answer-${currentQuestionIndex}`}
                      value="True"
                      checked={userChoices[currentQuestionIndex] === "True"}
                      onChange={() =>
                        handleOptionChange(currentQuestionIndex, "True")
                      }
                      required
                    />
                    <label
                      className="flex justify-center items-center w-full hover:cursor-pointer text-[#00403d] font-semibold"
                      htmlFor={`true-${currentQuestionIndex}`}
                    >
                      True
                    </label>
                  </div>
                  <div
                    className={`flex flex-row w-full px-6 h-14 rounded-md ease-in-out duration-300 hover:cursor-pointer hover:bg-green-200 ${
                      userChoices[currentQuestionIndex] === "False"
                        ? "bg-green-200 border-2 border-green-400"
                        : "bg-gray-200"
                    }`}
                  >
                    <input
                      className="hidden justify-start items-start hover:cursor-pointer"
                      type="radio"
                      id={`false-${currentQuestionIndex}`}
                      name={`answer-${currentQuestionIndex}`}
                      value="False"
                      checked={userChoices[currentQuestionIndex] === "False"}
                      onChange={() =>
                        handleOptionChange(currentQuestionIndex, "False")
                      }
                      required
                    />
                    <label
                      className="flex justify-center items-center w-full hover:cursor-pointer text-[#00403d] font-semibold"
                      htmlFor={`false-${currentQuestionIndex}`}
                    >
                      False
                    </label>
                  </div>
                </>
              ) : (
                questions[currentQuestionIndex].incorrect_answers
                  .concat(questions[currentQuestionIndex].correct_answer)
                  .sort()
                  .map((option, index) => (
                    <div
                      key={index}
                      className={`flex flex-row w-full gap-4 px-6 h-14 rounded-md ease-in-out duration-300 hover:cursor-pointer hover:bg-green-200 ${
                        userChoices[currentQuestionIndex] === option
                          ? "bg-green-200 border-2 border-green-400"
                          : "bg-gray-200"
                      }`}
                    >
                      <input
                        className="hidden justify-start items-start hover:cursor-pointer"
                        type="radio"
                        id={`option-${currentQuestionIndex}-${index}`}
                        name={`answer-${currentQuestionIndex}`}
                        value={option}
                        checked={userChoices[currentQuestionIndex] === option}
                        onChange={() =>
                          handleOptionChange(currentQuestionIndex, option)
                        }
                        required
                      />
                      <label
                        className="flex justify-center text-sm md:text-base items-center w-full h-full hover:cursor-pointer text-[#00403d] font-semibold"
                        htmlFor={`option-${currentQuestionIndex}-${index}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))
              )}
            </form>
          </div>
          <div className="flex flex-row justify-evenly sm:justify-between items-center mb-6 md:px-10 w-full">
            <h1 className="text-sm sm:text-lg md:text-xl font-bold text-[#00403d] text-center">
              Question {currentQuestionIndex + 1} of {numQuestions}
            </h1>
            <div className="flex flex-row gap-2 md:gap-4">
              <button
                className="bg-[#00403d] font-semibold text-white px-2 py-2 sm:px-4 sm:py-3 rounded-md hover:bg-[#e79209] ease-in-out duration-500"
                onClick={handlePreviousQuestion}
                //disabled={currentQuestionIndex === 0}
                hidden={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                className="bg-[#00403d] text-white font-semibold px-4 py-3 sm:px-4 sm:py-3 rounded-md hover:bg-[#e79209] ease-in-out duration-500 "
                onClick={handleNextQuestionOrSubmit}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Questions;
