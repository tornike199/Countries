import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <div>
      <header
        className={` py-8 lg:py-7 px-7 lg:px-20 flex justify-between  items-center  transition-colors duration-300 ${
          darkMode ? "bg-[#2b3945] text-white" : "bg-white border-b-1 border-zinc-300  text-[#111517]"
        }`}
      >
        <div>
          <Link to={`/`}>
            <h1 className="font-nunito text-base lg:text-2xl font-extrabold leading-normal ">Where in the world?</h1>
          </Link>
        </div>
        <div>
          <button onClick={toggleDarkMode} className="font-nunito text-sm lg:text-base font-semibold leading-normal flex items-center gap-2 cursor-pointer">
            {darkMode ? <img src="/public/moonDark.svg" alt="moon" /> : <img src="/public/moon.svg" alt="moon" />}
            Dark Mode
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
