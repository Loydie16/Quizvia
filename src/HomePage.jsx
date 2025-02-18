import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import QuizContext from "./QuizContext";
import heroImg from "./assets/hero-img.png";
import logo from "./assets/quizvia-high-resolution-logo-transparent.png";

function HomePage() {
  const [name, setName] = useState("");
  const {
    numQuestions,
    setNumQuestions,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    type,
    setType,
  } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    navigate("/questions", {
      state: {
        numQuestions,
        difficulty,
        category,
        type,
      },
    });
  };

  return (
    <>
      <main className="flex flex-col md:flex-row justify-center items-center w-full h-full min-h-screen bg-[#00403d]">
        <div className="hidden lg:flex flex-col w-full lg:w-1/2 h-full gap-16">
          <div className="w-full h-32">
            <img className="max-w-full max-h-full p-6" src={logo} alt="logo" />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <img
              className="max-w-full max-h-full"
              src={heroImg}
              alt="hero-img"
            />
          </div>
          <div className="flex flex-row items-end pb-4 justify-between w-full h-40 px-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-xl font-bold text-custom-gray">
                Follow me: @jltdev
              </span>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/johnloydtalagtag16"
                  target="_blank"
                >
                  <FaFacebook className="text-2xl text-custom-gray" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jon-loyd-t-talagtag-00398227a/"
                  target="_blank"
                >
                  <FaLinkedin className="text-2xl text-custom-gray" />
                </a>
                <a href="https://github.com/Loydie16" target="_blank">
                  <FaGithub className="text-2xl text-custom-gray" />
                </a>
              </div>
            </div>

            <span className="font-semibold text-md text-custom-gray">
              © 2024 Quizvia. All Rights Reserved.
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-[#00403d] p-5 flex-grow w-full lg:w-1/2 h-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 place-content-center">
              <span className="font-bold text-3xl md:text-4xl 2xl:text-6xl text-custom-gray">
                Welcome to Quizvia
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-md lg:text-xl text-custom-gray font-semibold">
                  What should we call you?
                </span>
                <input
                  className="border-2 border-white rounded-md p-1 md:p-2 text-white bg-transparent outline-none font-thin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your nickname (Maximum of 8 characters.)"
                  maxLength={8}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-4">
                <span className="font-bold text-xl lg:text-2xl text-custom-gray">
                  Quiz Settings:
                </span>
                <span className="text-sm md:text-lg text-custom-gray">
                  Number of Questions:
                </span>
                <input
                  className="border border-slate-400 bg-white rounded-md p-1 px-2 md:p-2 text-black"
                  type="number"
                  placeholder="Enter the number of questions. (5-50)"
                  max={50}
                  min={5}
                  required
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                />

                <span className="text-sm md:text-lg text-custom-gray">
                  Difficulty:
                </span>
                <select
                  className="border border-slate-400 bg-white rounded-md p-1 md:p-2 text-black hover:cursor-pointer"
                  required
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select Difficulty
                  </option>
                  <option value="any">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <span className="text-sm md:text-lg text-custom-gray">
                  Category:
                </span>
                <select
                  className="border border-slate-400 bg-white rounded-md p-1 md:p-2 text-black hover:cursor-pointer"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>
                  <option value="any">Any Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="10">Books</option>
                  <option value="11">Film</option>
                  <option value="12">Music</option>
                  <option value="13">Musicals & Theatres</option>
                  <option value="14">Television</option>
                  <option value="15">Video Games</option>
                  <option value="16">Board Games</option>
                  <option value="17">Science & Nature</option>
                  <option value="18">Computers</option>
                  <option value="19">Mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                  <option value="29">Comics</option>
                  <option value="30">Gadgets</option>
                  <option value="31">Japanese Anime & Manga</option>
                  <option value="32">Cartoon & Animations</option>
                </select>

                <span className="text-sm md:text-lg text-custom-gray">
                  Type of Questions:
                </span>
                <select
                  className="border border-slate-400 bg-white rounded-md p-1 md:p-2 text-black hover:cursor-pointer"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select Type of Questions
                  </option>
                  <option value="any">Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>

                <ul className="flex flex-col list-disc list-outside pl-4 gap-2">
                  <li className="text-md text-custom-gray xs:text-sm">
                    You can only select 5 up to 50 questions at a time.
                  </li>
                  <li className="text-md text-custom-gray xs:text-sm">
                    The passing score is 60% of the total number of questions.
                  </li>
                  <li className="text-md text-custom-gray xs:text-sm">
                    The timer adds 15 seconds per easy question, 20 per medium
                    or any difficulty, and 25 per hard question.
                  </li>
                </ul>

              <button
                className="text-white font-semibold text-xl rounded-md p-3 bg-[#006d6a] hover:bg-[#0a5a62] ease-in-out duration-300 transform hover:scale-95 hover:shadow-lg hover:cursor-pointer"
                type="submit"
              >
                Start Quiz
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default HomePage;
