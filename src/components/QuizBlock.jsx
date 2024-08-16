import { memo } from "react";
import he from "he";
// eslint-disable-next-line react/display-name
const QuizBlock = memo((props) => {
  function questionAnswer(answer) {
    props.getAnswer(props.question, answer);
    // console.log(props.question, answer);
  }
  const quizQuestions = props.shuffledAnswers.map((answer, index) => (
    <button
      key={index}
      className={`font-inter font-semibold text-[#293264] text-xs border-[1px] border-[#4D5B9E] py-2 px-3 rounded-xl text-left  
      ${props.selectedAnswer === answer ? "bg-[#D6DBF5] border-none" : ""} 
      ${
        props.showResult && answer === props.correctAnswer
          ? "bg-[#94D7A2] border-none"
          : ""
      }
      ${
        props.showResult &&
        answer === props.selectedAnswer &&
        answer !== props.correctAnswer
          ? "bg-[#F8BCBC] border-none"
          : ""
      }
      ${
        props.showResult && answer !== props.correctAnswer ? " opacity-50" : ""
      }`}
      disabled={props.showResult}
      onClick={() => questionAnswer(answer)}
    >
      {he.decode(answer)}
    </button>
  ));
  return (
    <div className="">
      <div className="px-10 py-2 z-10">
        <h1 className="font-karla text-base font-bold text-[#293264] leading-5 ">
          {he.decode(props.question)}
        </h1>
        <div className="flex gap-4 mt-3 ">{quizQuestions}</div>
        <hr className="mt-4 bg-[#DBDEF0]" />
      </div>
    </div>
  );
});

export default QuizBlock;
