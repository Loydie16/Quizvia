
import HomePage from "./HomePage";
import Questions from "./Questions";
import Results from "./Results";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QuizProvider } from "./QuizContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "questions",
    element: <Questions />
  },
  {
    path: "results",
    element: <Results />
  },
])



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


