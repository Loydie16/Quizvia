import { TailSpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


function Questions() {

    const location = useLocation();
    const { numQuestions, difficulty, category, type } = location.state;

    const [questions, setQuestions] = useState([]);
    const [responseCode, setResponse] = useState(2);

    useEffect(() => {
      fetchQuestions(numQuestions, difficulty, category, type);
    }, [numQuestions, difficulty, category, type]);

    const fetchQuestions = async (numQuestions, difficulty, category, type) => {
      // Construct the params object conditionally
      const params = {
        amount: numQuestions,
        ...(difficulty !== "any" && { difficulty }),
        ...(category !== "any" && { category }),
        ...(type !== "any" && { type }),
      };

      await axios
        .get(`https://opentdb.com/api.php`, { params })
        .then((response) => {
          // Handle fetched questions data
          console.log(response.data);
          setQuestions(response.data.results);
          setResponse(response.data.response_code);
          
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching questions:", error);
        });
    };
    console.log(responseCode);


    
  return (
    <div className="flex flex-col justify-center h-screen bg-[#00403d]">
      {responseCode !== 0 ? (
        <div className="flex flex-col justify-center items-center pt-20 gap-6 text-center mx-4">
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
          <div className="flex justify-center mt-40 items-center">
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
        <div className="flex flex-col justify-center lg:w-7/12 w-11/12 h-5/6 mx-auto  bg-white rounded-md">
          <div className="flex flex-row justify-between p-4 md:p-10 w-full h-1/5 border-b-2 border-[#00403d]">
            <div className="flex flex-col justify-center items-start xl:gap-2">
              <h1 className=" font-bold text-[#00403d] sm:text-xl text-md">
                Type:{" "}
                <span className="text-[#e79209]">{questions[0].type}</span>
              </h1>
              <h1 className=" font-bold text-[#00403d] sm:text-xl text-md">
                Difficulty:{" "}
                <span className="text-[#e79209]">
                  {questions[0].difficulty}
                </span>
              </h1>
              <h1 className=" font-bold text-[#00403d] sm:text-xl text-md">
                Category:{" "}
                <span className="text-[#e79209]">{questions[0].category}</span>
              </h1>
            </div>
            <div></div>

            <div className="flex justify-center items-center gap-4">
              <h1 className="hidden md:block ">Remaining Time:</h1>
              <CountdownCircleTimer
                isPlaying
                duration={7}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
                size={70}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center p-4 md:p-8 w-full h-4/5">
            <h1 className="text-md sm:text-xl md:text-2xl font-bold text-[#00403d] text-center">
              {questions[0].question}
            </h1>
          </div>

          <div className="flex flex-row justify-between items-center px-2 pb-4 md:px-10 w-full">
            <h1 className="text-sm sm:text-lg md:text-xl font-bold text-[#00403d] text-center">
              Question {1} of {numQuestions}
            </h1>
            <div className="flex flex-row gap-2 md:gap-4">
              <button className="bg-[#00403d] text-white px-2 py-2 sm:px-4 sm:py-3 rounded-md">
                Previous
              </button>
              <button className="bg-[#00403d] text-white px-2 py-2 sm:px-4 sm:py-3 rounded-md">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Questions;
