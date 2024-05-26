
import HomePage from "./HomePage";
import Questions from "./Questions";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "questions",
    element: <Questions />
  }
])



function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App


