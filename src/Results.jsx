import { useContext, useEffect, useState, createRef } from "react";
import QuizContext from "./QuizContext";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa6";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { FacebookIcon, FacebookShareButton, XIcon, TwitterShareButton} from "react-share";
import { useScreenshot, createFileName } from "use-react-screenshot";
import downloadsImage from "./assets/downloads.png";

function Results() {
  const { questions, userChoices, numQuestions, difficulty, category, type } =
    useContext(QuizContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [showConfetti, setShowConfetti] = useState(false);
  const [modalIsOpen, setOpenModal] = useState();
  const shareUrl = "tailwindcss.com";
  const description = () => {
    if (scorePercentage >= passingPercentage) {
      return (
        "I got a score of " +
        score +
        " out of " +
        questions.length +
        " on Quizvia! I passed! Try it out!"
      );
    } else {
      return (
        "I got a score of " +
        score +
        " out of " +
        questions.length +
        " on Quizvia! Even though I didn't pass, I had fun! Try it out!"
      );
    }
  };


  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const score = Object.keys(userChoices).reduce((score, key) => {
    const question = questions[key];
    if (question.correct_answer === userChoices[key]) {
      return score + 1;
    }
    return score;
  }, 0);

  const passingPercentage = 60;
  const scorePercentage = (score / questions.length) * 100;

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }

    if (scorePercentage >= passingPercentage) {
      setShowConfetti(true);
    }

    if (!numQuestions || !difficulty || !category || !type) {
      navigate("/");
      return;
    }
  }, [
    category,
    difficulty,
    name,
    navigate,
    numQuestions,
    type,
    scorePercentage,
  ]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      height: "90%",
      radius: "60px",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.30)",
    },
  };

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

  const getOptionBgColor = (option, correctAnswer, userChoice) => {
    if (option === correctAnswer) {
      return "bg-green-200";
    }
    if (option === userChoice) {
      return "bg-red-200";
    }
    return "bg-gray-200";
  };

  const getOptionLabel = (option, correctAnswer, userChoice) => {
    if (option === correctAnswer) {
      return "Correct Answer";
    }
    if (option === userChoice) {
      return "Your answer";
    }
    return "";
  };

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "Quizvia Score", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <main className="flex flex-col bg-[#00403d] w-full min-h-screen items-center">
      {showConfetti && (
        <Confetti
          className="w-full h-full"
          recycle={false}
          numberOfPieces={2500}
          tweenDuration={10000}
        />
      )}
      <div className="flex flex-col items-center gap-2 w-full h-auto m-6 lg:m-10 xs:m-2">
        <div
          className="flex flex-col items-center gap-2 w-full py-4 bg-[#00403d]"
          ref={ref}
        >
          <span className="text-2xl md:text-4xl font-bold text-custom-gray ">
            Your Score <span className="text-[#ff9209]">{name}</span> is:
          </span>
          <span className="text-6xl md:text-7xl font-bold text-[#ff9209]">
            {score}/{questions.length}
          </span>
          <span className="text-xl md:text-3xl font-bold text-custom-gray text-center px-4 lg:pt-10 pt-4 ">
            {scorePercentage >= passingPercentage
              ? "Congratulations! You reached the passing score.  🎉👏🥳🎉"
              : "You did not reach the passing score. Better luck next time! 😔"}
          </span>
          <span className="flex justify-center w-full text-LG md:text-2xl font-bold text-custom-gray pt-2 md:pt-4 lg:pt-10">
            Your Quiz Settings:
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
        </div>
        <div className="flex flex-col items-center gap-2 w-full ">
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:pt-0 lg:pt-6 px-8 justify-center">
            <button
              className="bg-[#ffd099] md:w-[30%] w-full text-[#00403d] rounded-md p-2 md:p-2 font-bold text-lg md:text-xl hover:bg-[#e79209] ease-in-out duration-300"
              onClick={() => {
                openModal();
              }}
            >
              Review Answers
            </button>
            <button
              className="bg-[#ffd099] md:w-[30%] w-full text-[#00403d] rounded-md p-2 md:p-2 font-bold text-lg md:text-xl hover:bg-[#e79209] ease-in-out duration-300"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Play Again
            </button>

            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              ariaHideApp={false}
              onRequestClose={closeModal}
            >
              <div className="flex absolute lg:ml-10 ">
                <h1 className="text-xl md:text-4xl font-bold text-[#0a5a62]">
                  Review your Answers
                </h1>
              </div>
              <div className="flex sticky top-0 items-end justify-end mb-4 md:mb-8">
                <button
                  className="p-1 px-3 rounded-lg text-xl text-white font-semibold bg-red-400 hover:bg-red-600 ease-in-out duration-300"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              <div className="flex flex-col items-center gap-6 lg:mx-10 lg:my-4   ">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="question-result flex flex-col bg-gray-100 gap-4 rounded-lg p-4 w-full"
                  >
                    <div className="flex flex-col md:flex-row gap-2 md:gap-10">
                      <h1 className="font-bold text-[#00403d] md:text-lg text-sm">
                        Difficulty:{" "}
                        <span className="text-[#e79209]">
                          {questions[index].difficulty.charAt(0).toUpperCase() +
                            questions[index].difficulty.slice(1)}
                        </span>
                      </h1>
                      <h1 className="font-bold text-[#00403d] md:text-lg text-sm">
                        Category:{" "}
                        <span className="text-[#e79209]">
                          {questions[index].category}
                        </span>
                      </h1>
                    </div>
                    <h2 className="text-xl font-bold md:mt-4 text-[#00403d]">
                      {question.question}
                    </h2>
                    {questions[index].type === "boolean"
                      ? questions[index].incorrect_answers
                          .concat(questions[index].correct_answer)
                          .sort((a, b) =>
                            a === "True" ? -1 : b === "False" ? 1 : 0
                          ) // Custom sort for boolean questions
                          .map((option, i) => (
                            <div
                              key={i}
                              className={`flex md:flex-row w-full p-3 gap-2 flex-col justify-between rounded-md ${getOptionBgColor(
                                option,
                                questions[index].correct_answer,
                                userChoices[index]
                              )}`}
                            >
                              <span className="lg:text-md text-sm font-semibold text-[#00403d]">
                                {option}
                              </span>
                              <span className="flex lg:text-md text-sm font-light md:justify-end md:items-end">
                                {getOptionLabel(
                                  option,
                                  questions[index].correct_answer,
                                  userChoices[index]
                                )}
                              </span>
                            </div>
                          ))
                      : questions[index].incorrect_answers
                          .concat(questions[index].correct_answer)
                          .sort()
                          .map((option, i) => (
                            <div
                              key={i}
                              className={`flex md:flex-row w-full p-3 gap-2 flex-col justify-between rounded-md ${getOptionBgColor(
                                option,
                                questions[index].correct_answer,
                                userChoices[index]
                              )}`}
                            >
                              <span className="lg:text-md text-sm font-semibold text-[#00403d]">
                                {option}
                              </span>
                              <span className="flex lg:text-md text-sm font-light md:justify-end md:items-end">
                                {getOptionLabel(
                                  option,
                                  questions[index].correct_answer,
                                  userChoices[index]
                                )}
                              </span>
                            </div>
                          ))}
                    {userChoices[index] === question.correct_answer ? (
                      <p className="font-normal text-green-600">
                        You got it right! 🎉
                      </p>
                    ) : (
                      <p className="font-normal text-red-600">
                        You got it wrong! 😔
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Modal>
          </div>

          <div className="flex flex-col items-center gap-2 w-full lg:pt-14 md:pt-0 pt-4 xs:pt-2">
            <h1 className="text-md md:text-xl text-custom-gray font-semibold">
              Share:
            </h1>
            <div className="flex flex-row gap-4">
              <FacebookShareButton url={shareUrl} hashtag={description()}>
                <FacebookIcon className="rounded-md" size={36} round={false} />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={description()}
                hashtags={["Quizvia"]}
              >
                <XIcon size={36} className="rounded-md" round={false} />
              </TwitterShareButton>
              <button
                className="size-9 rounded-md bg-[#14b1c0]"
                onClick={downloadScreenshot}
              >
                <img className="p-2" src={downloadsImage} alt="screenshot" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full h-[14%] md:h-1/6 bg-[#0a5a62] ">
        <div className="flex items-center flex-col md:flex-row  justify-between w-full h-full p-3 md:px-20">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-md md:text-xl font-bold text-custom-gray">
              Follow me: @jltdev
            </span>
            <div className="flex flex-row gap-4">
              <a
                href="https://www.facebook.com/johnloydtalagtag16"
                target="_blank"
              >
                <FaFacebook className="md:size-8 size-6 text-custom-gray" />
              </a>
              <a href="https://www.linkedin.com/in/jon-loyd-t-talagtag-00398227a/">
                <FaLinkedin
                  className="md:size-8 size-6 text-custom-gray"
                  target="_blank"
                />
              </a>
              <a href="https://github.com/Loydie16" target="_blank">
                <FaGithub className="md:size-8 size-6 text-custom-gray" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-semibold text-sm md:text-lg text-custom-gray">
              © 2024 Quizvia. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Results;
