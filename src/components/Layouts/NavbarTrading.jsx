import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeToggle from "../Elements/ThemeToggle/Index";
import { NavLink } from "react-router-dom";

const NavbarTrading = () => {
    const [lang, setLang] = useState("EN");
    
    const logo = 'https://raw.githubusercontent.com/Iqbalenter/assets/refs/heads/main/LOGO_AIX_INTELIGENCE_2-removebg-preview.png';

    return (
        <nav className="w-full top-0 left-0 z-10 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
            {/* Logo Section */}
            <div>
                <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
                    <img
                        src={logo}
                        alt="AIX Agent Logo"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    />
                    <span className="navbar-trading font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">AIX</span>
                </NavLink>
            </div>

            <div className="flex-1"></div>

            {/* Controls Section */}
            <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />
                
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    style={{WebkitAppearance: 'none'}}
                    className="border font-semibold rounded-full px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                >
                    <option value="EN">EN</option>
                    <option value="ID">ID</option>
                </select>

                {/* Connect Button Container */}
                <div className="connect-button-wrapper">
                    <ConnectButton 
                        showBalance={false} 
                        chainStatus="icon" 
                        accountStatus={{ 
                            smallScreen: 'avatar', 
                            largeScreen: 'full' 
                        }} 
                    />
                </div>
            </div>
        </nav>
    )
}

export default NavbarTrading;