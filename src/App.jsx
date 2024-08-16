import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizePage from "./pages/QuizePage";
import "./bg.css";

function App() {
  return (
    <>
      <div className="h-full w-full  p-10 bg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quizes" element={<QuizePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
