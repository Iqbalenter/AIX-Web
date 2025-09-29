import { NavLink } from "react-router-dom";
import SosmedVideo from "../../../assets/SocialVideo.mp4"

import YotubeIcon from "../../../assets/SVG (2).png";
import XIcon from "../../../assets/SVG (3).png";
import DiscordIcon from "../../../assets/SVG (4).png";
import TelegramIcon from "../../../assets/SVG (5).png";
import GithubIcon from "../../../assets/SVG (6).png";

const SosmedContent = () => {
    const socialLinks = [
        { 
            icon: YotubeIcon, 
            alt: "YouTube", 
            href: "#", // Add actual YouTube link when available
            external: true 
        },
        { 
            icon: XIcon, 
            alt: "X (Twitter)", 
            href: "https://x.com/aixaiagent",
            external: true 
        },
        { 
            icon: DiscordIcon, 
            alt: "Discord", 
            href: "#", // Add Discord link when available
            external: true 
        },
        { 
            icon: TelegramIcon, 
            alt: "Telegram", 
            href: "https://t.me/aixcommunity01",
            external: true 
        },
        { 
            icon: GithubIcon, 
            alt: "GitHub", 
            href: "#", // Add GitHub link when available
            external: true 
        }
    ];

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
                <source src={SosmedVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-10"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
                <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight max-w-4xl mx-auto">
                    Join the community and start trading
                </h1>
                
                <NavLink 
                    to="/trading" 
                    className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 inline-block text-white py-2.5 px-8 sm:py-3 sm:px-12 md:px-16 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{
                        background: 'linear-gradient(to right, #F1DB4A, #9A6E1F)'
                    }}
                >
                    Get Started
                </NavLink>
                
                <div className="social-media flex flex-wrap justify-center items-center mt-8 sm:mt-10 md:mt-12 gap-3 sm:gap-4 md:gap-6">
                    {socialLinks.map((social, index) => (
                        <div 
                            key={index}
                            className="icon bg-gradient-to-b from-[#7A6126] to-[#554519] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-3 sm:p-3.5 md:p-4 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg"
                        >
                            {social.href && social.href !== "#" ? (
                                <NavLink 
                                    to={social.href}
                                    target={social.external ? "_blank" : undefined}
                                    rel={social.external ? "noopener noreferrer" : undefined}
                                    className="flex items-center justify-center w-full h-full"
                                    aria-label={`Visit our ${social.alt} page`}
                                >
                                    <img 
                                        src={social.icon} 
                                        alt={social.alt}
                                        className="w-full h-full object-contain"
                                    />
                                </NavLink>
                            ) : (
                                <div 
                                    className="flex items-center justify-center w-full h-full opacity-70 cursor-not-allowed"
                                    title={`${social.alt} link coming soon`}
                                >
                                    <img 
                                        src={social.icon} 
                                        alt={social.alt}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SosmedContent;