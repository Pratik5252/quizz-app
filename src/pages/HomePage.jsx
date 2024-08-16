import { Link } from "react-router-dom";
import Button from "../components/Button";


const HomePage = () => {
  return (
    <div className="w-full h-full bg-[#F5F7FB] rounded-xl overflow-hidden">
      <div className="h-screen w-full flex flex-col border-[1px] justify-center items-center relative overflow-hidden shadow-2xl shadow-black/5">
        <div className="absolute -top-1/3 -right-1/4 md:-right-1/4 lg:-right-40 ">
          <img src="./src/assets/blobs1.svg" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-karla font-bold text-[#293264] m-2">
            Quizzical
          </h2>
          <h4 className="text-lg font-inter font-base text-[#293264] mt-2">
            Some description if needed
          </h4>
          <Link to="/quizes" className="mt-7">
            <Button name={"Start quiz"} />
          </Link>
        </div>
        <div className="absolute -bottom-20 -left-1/4 max-sm:-left-1/4 md:-left-1/4 lg:-left-40">
          <img src="./src/assets/blobs2.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
