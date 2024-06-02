
import HomePage from "./HomePage";
import Questions from "./Questions";
import Results from "./Results";
import Error from "./error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QuizProvider } from "./QuizContext";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />, // Add errorElement for the root path
  },
  {
    path: "questions",
    element: <Questions />,
    errorElement: <Error />, // Correctly use errorElement
  },
  {
    path: "results",
    element: <Results />,
    errorElement: <Error />, // Correctly use errorElement
    ErrorBoundaryFallback: <Error />, // Add ErrorBoundaryFallback for the results path
  },
]);



function App() {
  
  return (
    <>
      <QuizProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </QuizProvider>
    </>
  );
}

export default App


