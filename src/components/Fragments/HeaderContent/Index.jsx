import HeaderVideo from "../../../assets/HeaderVideo.mp4"
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-1"
      >
        <source src={HeaderVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-10"></div>

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#E3C943] leading-tight">
          Onchain Perps for Any Asset
        </h1>
        
        <p className="mt-4 sm:mt-6 md:mt-8 font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
          Trade trending tokens and maximize your returns with unlimited opportunities
        </p>

        <NavLink 
          to="/trading" 
          className="mt-6 sm:mt-8 inline-block text-white py-2.5 px-8 sm:py-3 sm:px-12 md:px-16 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(to right, #F1DB4A, #9A6E1F)'
          }}
        >
          Trade Now
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
