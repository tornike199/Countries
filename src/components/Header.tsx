import { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <header
        className={` py-9  md:py-7 px-4  md:px-20 flex justify-between items-center shadow-md transition-colors duration-300 ${darkMode ? "bg-[#2b3945] text-white" : "bg-white text-[#111517]"}`}
      >
        <div>
          <h1 className="font-nunito text-base md:text-2xl font-extrabold leading-normal">Where in the world?</h1>
        </div>
        <div>
          <button onClick={toggleMode} className="font-nunito text-sm md:text-base font-semibold leading-normal flex items-center gap-2 cursor-pointer">
            {darkMode ? <img src="/public/moonDark.svg" alt="moon" /> : <img src="/public/moon.svg" alt="moon" />}
            Dark Mode
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
