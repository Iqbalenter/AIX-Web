import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../Elements/ThemeToggle/Index";

const Navbar = () => {
    const [lang, setLang] = useState("EN");
    
    const arrow = 'https://raw.githubusercontent.com/Iqbalenter/assets/refs/heads/main/SVG.png';
    const logo = 'https://raw.githubusercontent.com/Iqbalenter/assets/refs/heads/main/LOGO_AIX_INTELIGENCE_2-removebg-preview.png';

    return (
        <nav className="w-full fixed top-0 left-0 z-10 px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Logo Section */}
            <div>
                <NavLink to="/" className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
                <span className="navbar-home font-semibold text-sm sm:text-base md:text-lg">AIX</span>
                </NavLink>
            </div>

            <div className="flex-1"></div>

            {/* Menu Items */}
            <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />
                
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    style={{WebkitAppearance: 'none'}}
                    className="border font-semibold rounded-full px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none"
                >
                    <option value="EN">EN</option>
                    <option value="ID">ID</option>
                </select>

                <NavLink 
                    to="/trading" 
                    className="bg-gray-50 text-black px-3 sm:px-4 py-1.5 sm:py-2 flex items-center rounded-full text-xs sm:text-sm"
                >
                    <img src={arrow} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2" alt="Arrow"/>
                    <span className="hidden xs:inline">Trade Now</span>
                    <span className="xs:hidden">Trade</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar;