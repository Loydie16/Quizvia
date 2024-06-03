
import HomePage from "./HomePage";
import Questions from "./Questions";
import Results from "./Results";
import Error from "./error";
import PageError from "./pageError";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QuizProvider } from "./QuizContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageError />,
  },
  {
    path: "questions",
    element: <Questions />,
    errorElement: <PageError />,
  },
  {
    path: "results",
    element: <Results />,
    errorElement: <PageError />,
  },
  {
    path: "*",
    element: <Error />,
    errorElement: <PageError />,
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


