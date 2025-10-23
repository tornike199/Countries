import "swiper/css";
import type { Country } from "../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useAppContext } from "../context/AppContext";

interface SliderProps {
  data: Country[];
}

const Slider = ({ data }: SliderProps) => {
  const { darkMode } = useAppContext();
  const loopEnabled = data.length > 3;

  return (
    <div className={`w-full overflow-hidden py-4 transition-colors duration-300 ${darkMode ? "bg-[#2B3844] text-white" : "bg-gray-100 text-gray-800"}`}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={20}
        loop={loopEnabled}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-full h-44 md:h-56"
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {data.map((country, index) => (
          <SwiperSlide key={index} className="!flex !flex-col !items-center !justify-center text-center">
            <img src={country.flags.svg} alt={country.name || country.name} className="w-24 h-16 object-cover shadow-md rounded-md mb-2 transition-transform duration-300 hover:scale-105" />
            <p className={`text-sm font-semibold truncate w-24 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{country.name || country.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
