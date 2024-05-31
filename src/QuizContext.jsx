import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [userChoices, setUserChoices] = useState({});
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  return (
    <QuizContext.Provider
      value={{ questions, setQuestions, userChoices, setUserChoices, numQuestions, setNumQuestions, difficulty, setDifficulty, category, setCategory, type, setType }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Define prop types for QuizProvider
QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizContext;
