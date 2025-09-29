import { useState } from "react";
import { NavLink } from "react-router-dom";
import PostBox from "../../assets/SVG (7).png";

const Footer = () => {
    const [email, setEmail] = useState("");
    const logo = 'https://raw.githubusercontent.com/Iqbalenter/assets/refs/heads/main/LOGO_AIX_INTELIGENCE_2-removebg-preview.png';

    const footerSections = [
        {
            title: "Products",
            links: [
                { name: "Perps", href: "#" },
                { name: "Spot", href: "#" },
                { name: "Synthia", href: "#" }
            ]
        },
        {
            title: "Company", 
            links: [
                { name: "Join Us", href: "#" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "White Paper", href: "#" },
                { name: "Audit Report", href: "#" },
                { name: "Docs", href: "#" },
                { name: "Knowledge Hub", href: "#" },
                { name: "Patent", href: "#" },
                { name: "Legacy", href: "#" }
            ]
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Newsletter subscription:", email);
    };

    return (
        <div className="footer-content py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-30">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-6">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="footer-header flex items-center mb-4 sm:mb-6">
                            <img 
                                src={logo} 
                                alt="AIX Agent Logo"
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mr-3 sm:mr-4"
                            />
                            <h1 className="text-xl sm:text-2xl font-semibold">AIX Agent</h1>
                        </div>
                        
                        {/* Divider */}
                        <hr className="border-none h-0.5 bg-[#E9D146]/35 mb-4 sm:mb-6"/>
                        
                        {/* Newsletter */}
                        <div className="footer-description mb-4 sm:mb-6">
                            <h2 className="text-sm sm:text-base md:text-lg leading-relaxed">
                                <span className="text-yellow-300">Get alpha.</span> Subscribe to our newsletter
                            </h2>
                        </div>
                        
                        {/* Form */}
                        <div className="footer-form mb-6 sm:mb-8">
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center rounded-xl overflow-hidden bg-gradient-to-r from-[#4D3E15] to-[#7E6427] w-full max-w-lg"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Please fill in a valid email address"
                                    className="flex-1 px-4 sm:px-5 py-4 sm:py-5 bg-transparent text-white placeholder:text-gray-400 focus:outline-none text-sm sm:text-base"
                                    required
                                />
                                <div className="mr-2">
                                    <button
                                        type="submit"
                                        className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 m-1 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                                        aria-label="Subscribe to newsletter"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            className="sm:w-[18px] sm:h-[18px]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact */}
                        <div className="contactus flex items-start">
                            <div className="contactus-icon mr-4 sm:mr-5 flex-shrink-0">
                                <img 
                                    src={PostBox} 
                                    alt="Contact Us"
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-[45px] md:h-[45px]"
                                />
                            </div>
                            <div className="contactus-text">
                                <h3 className="text-sm sm:text-base font-semibold mb-1">Contact Us</h3>
                                <a 
                                    href="mailto:info@aixagent.com"
                                    className="text-[#E9D146] text-xs sm:text-sm underline underline-offset-4 hover:text-yellow-200 transition-colors"
                                >
                                    info@aixagent.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Spacer for desktop */}
                    <div className="hidden lg:block"></div>

                    {/* Footer Links */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-6">
                        {footerSections.map((section, index) => (
                            <div key={index} className="footer-section">
                                <div className="section-header mb-4 sm:mb-6">
                                    <p className="text-[#E9D146] text-sm sm:text-base font-medium">{section.title}</p>
                                    <hr className="mt-4 sm:mt-6 border-none h-0.5 bg-[#E9D146]/35"/>
                                </div>
                                <div className="section-links space-y-3 sm:space-y-4">
                                    {section.links.map((link, linkIndex) => (
                                        <NavLink 
                                            key={linkIndex}
                                            to={link.href}
                                            className="block text-sm sm:text-base text-white hover:text-yellow-300 transition-colors"
                                        >
                                            {link.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-[#E9D146]/20">
                    <p className="mb-4 md:mb-0 text-[#E9D146] text-center md:text-left">
                        Copyrights © 2025 AIX Agent. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
                        <a href="#" className="hover:underline text-[#E9D146] hover:text-yellow-200 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:underline text-[#E9D146] hover:text-yellow-200 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:underline text-[#E9D146] hover:text-yellow-200 transition-colors">
                            Cookies Notice
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;