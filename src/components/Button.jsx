import React from "react";

const Button = (props) => {
  const string = props.name;
  return (
    <div className="z-10">
      <button
        onClick={props.function}
        className="bg-[#4D5B9E] px-10 py-3 text-white/90 font-medium rounded-xl min-w-52"
      >
        {string}
      </button>
    </div>
  );
};

export default Button;
