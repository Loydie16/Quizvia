import { FaFacebook, FaFacebookMessenger, FaGithub } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [value, setValue] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [type, setType] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = localStorage.getItem("name");
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    localStorage.setItem("name", value);
    navigate("/questions", {
      state: {
        numQuestions,
        difficulty,
        category,
        type,
      },
    }); // Navigate to the questions page with state
  };

  return (
    <>
      <main className="flex flex-row justify-center items-center w-screen h-screen">
        <div className="lg:flex hidden size-full bg-[#0a5a62] flex-col">
          <div className="w-full h-40 ">
            <img
              className="w-80 h-40 p-6 ml-4  "
              src="../src/assets/quizvia-high-resolution-logo-transparent.png"
              alt="awdas"
            />
          </div>
          <div className="w-full h-[70%]">
            <img
              className="size-full"
              src="../src/assets/hero-img.png"
              alt="awdas"
            />
          </div>
          <div className="flex items-center justify-between w-full h-40 px-10 ">
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

            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold text-lg text-custom-gray">
                © 2024 Quizvia. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center size-full bg-[#00403d] p-5 md:p-20">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8 xs:gap-4 place-content-center">
              <span className="font-bold 2xl:text-6xl md:text-4xl text-4xl text-custom-gray">
                Welcome to Quizvia
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-lg text-custom-gray font-semibold ">
                  What should we call you?
                </span>
                <input
                  className="border-2 border-white  rounded-md p-2 text-white bg-transparent outline-none "
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Enter your nickname"
                  required
                  
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-bold text-2xl text-custom-gray">
                  Quiz Settings:
                </span>
                <span className="text-md text-custom-gray">
                  Number of Questions:
                </span>
                <input
                  className="border border-slate-400 bg-white rounded-md p-2  text-black "
                  type="number"
                  placeholder="Enter the number of questions"
                  max={50}
                  min={5}
                  required
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                />

                <span className="text-md text-custom-gray">Difficulty:</span>
                <select
                  className="border border-slate-400 bg-white rounded-md p-2 text-black hover:cursor-pointer"
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

                <span className="text-md text-custom-gray">Category:</span>
                <select
                  className="border border-slate-400 bg-white rounded-md p-2 text-black hover:cursor-pointer"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled  hidden>
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

                <span className="text-md text-custom-gray">
                  Type of Questions:
                </span>
                <select
                  className="border border-slate-400 bg-white rounded-md p-2 text-black hover:cursor-pointer"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled  hidden>
                    Select Type of Questions
                  </option>
                  <option value="any">Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>

              <div>
                <ul className="list-disc list-outside pl-4">
                  <li className="text-md text-custom-gray xs:text-sm">
                    You can only select up to 50 questions at a time.
                  </li>
                  <li className="text-md text-custom-gray xs:text-sm">
                    You can only select up to 50 questions at a time.
                  </li>
                  <li className="text-md text-custom-gray xs:text-sm">
                    You can only select up to 50 questions at a time.
                  </li>
                </ul>
              </div>
              <button
                className=" text-white rounded-md p-4 bg-[#006d6a] hover:bg-[#0a5a62] ease-in-out duration-300 transform hover:scale-95 hover:shadow-lg hover:cursor-pointer"
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
