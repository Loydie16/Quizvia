import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [userChoices, setUserChoices] = useState({});

  return (
    <QuizContext.Provider
      value={{ questions, setQuestions, userChoices, setUserChoices }}
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
