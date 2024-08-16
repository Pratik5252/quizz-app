import { useCallback, useEffect, useState } from "react";
import QuizBlock from "../components/QuizBlock";
import Button from "../components/Button";
import { all } from "axios";
import { Link } from "react-router-dom";

const QuizePage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsAndAnswer, setQuestionsAndAnswer] = useState([]);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error("Something went wrong ", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuestionsAndAnswer(
        questions.map((question) => {
          return {
            questions: question.question,
            shuffledAnswers: shuffle([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
            correctAnswer: question.correct_answer,
            selectedAnswer: "",
          };
        })
      );
    }
  }, [questions]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getAnswer = useCallback(
    (currentQuestion, answer) => {
      setQuestionsAndAnswer((prevState) =>
        prevState.map((question) =>
          question.questions === currentQuestion
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    },
    [setQuestionsAndAnswer]
  );

  console.log(questionsAndAnswer);

  const allSelected = () => {
    const allcheck = questionsAndAnswer.some(
      (question) => question.selectedAnswer == ""
    );
    setCheck(allcheck);

    //To Tracl Score
    if (!allcheck) {
      questionsAndAnswer.forEach((question) => {
        if (question.selectedAnswer === question.correctAnswer) {
          setCount((prevState) => prevState + 1);
        }
      });
    }

    //To show result
    setShowResult(true);
  };

  // console.log(count);

  const singleQuiz = questionsAndAnswer.map((question, index) => {
    return (
      <QuizBlock
        key={index}
        question={question.questions}
        shuffledAnswers={question.shuffledAnswers}
        correctAnswer={question.correctAnswer}
        getAnswer={getAnswer}
        selectedAnswer={question.selectedAnswer}
        showResult={showResult}
      />
    );
  });

  return (
    <div className="w-full h-screen flex bg-[#F5F7FB] rounded-xl overflow-hidden">
      <div className="w-full h-full flex flex-col border-[1px]  justify-center items-center relative overflow-hidden shadow-2xl shadow-black/5">
        <div className="absolute -top-1/3 -right-48 md:-right-1/4 lg:-right-40 ">
          <img src="./src/assets/blobs1.svg" />
        </div>
        <div className="">
          <div>{singleQuiz}</div>
        </div>
        {/* Warning message */}
        {/* {check && (
          <p className="text-red-500 font-semibold">
            Please answer all the questions
          </p>
        )} */}
        <div className="mt-7">
          {questions.length > 0 && !showResult && (
            <Button name="Check Answers" function={allSelected} />
          )}
        </div>
        {showResult && (
          <div className="flex justify-center items-center gap-4">
            <p className="font-inter font-bold text-base leading-3">
              You scored {count}/5 correct answers
            </p>
            <Link to="/">
              <Button name="Play again" />
            </Link>
          </div>
        )}
        <div className="absolute -bottom-40 -left-48 max-sm:-left-1/4 md:-left-1/4 lg:-left-40">
          <img src="./src/assets/blobs2.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default QuizePage;
