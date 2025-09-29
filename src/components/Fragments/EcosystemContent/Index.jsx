import { NavLink } from "react-router-dom";
import ecoHeart from "../../../assets/SVG (1).png";

import Logo1 from "../../../assets/Partner Logo 9.png";
import Logo2 from "../../../assets/image fill.png";
import Logo3 from "../../../assets/Partner Logo 1.png";
import Logo4 from "../../../assets/Partner Logo 10.png";
import Logo5 from "../../../assets/Partner Blast Logo.png";
import Logo6 from "../../../assets/Partner Logo 2.png";
import Logo7 from "../../../assets/Partner Logo 11.png";
import Logo8 from "../../../assets/Partner Logo 5.png";
import Logo9 from "../../../assets/Partner Logo 3.png";

const EcosystemContent = () => {
    const partnerLogos = [
        { src: Logo1, alt: "Partner Logo 1" },
        { src: Logo2, alt: "Partner Logo 2" },
        { src: Logo3, alt: "Partner Logo 3" },
        { src: Logo4, alt: "Partner Logo 4" },
        { src: Logo5, alt: "Blast Partner Logo" },
        { src: Logo6, alt: "Partner Logo 6" },
        { src: Logo7, alt: "Partner Logo 7" },
        { src: Logo8, alt: "Partner Logo 8" },
        { src: Logo9, alt: "Partner Logo 9" }
    ];

    return (
        <div className="ecosystem-content py-12 sm:py-16 md:py-20 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-30">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-20">
                    {/* Text Content */}
                    <div className="eco-text lg:col-span-1 text-center lg:text-left">
                        <div className="eco-svg flex justify-center lg:justify-start">
                            <img 
                                src={ecoHeart} 
                                alt="Ecosystem Heart Icon"
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                            />
                        </div>

                        <div className="eco-header mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                            <div className="eco-sub-title">
                                <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-medium">
                                    Ecosystem Partners
                                </p>
                            </div>
                            <div className="eco-main mt-4 sm:mt-6">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-semibold leading-tight">
                                    Building with the best
                                </h1>
                            </div>
                            <div className="eco-description mt-6 sm:mt-8 md:mt-10 lg:mt-11">
                                <p className="text-yellow-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                                    We partner with the best market makers, DeFi protocols, and L1s / L2s in Web3 to bring users the most robust onchain trading experience.
                                </p>
                            </div>
                            <div className="eco-button mt-6 sm:mt-8 md:mt-10 lg:mt-11">
                                <NavLink 
                                    to="https://t.me/aixcommunity01" 
                                    className="inline-block bg-amber-300 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-amber-400 transition-colors"
                                >
                                    Join Us
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Partner Logos Grid */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-9">
                            {partnerLogos.map((logo, index) => {
                                const isUp = index % 2 === 0
                                const delayClass = `eco-delay-${(index % 9) + 1}`
                                const floatClass = isUp ? 'eco-float-up' : 'eco-float-down'
                                return (
                                    <div 
                                        key={index}
                                        className={`card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-8 xl:p-11 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${floatClass} ${delayClass}`}
                                    >
                                        <img 
                                            src={logo.src} 
                                            alt={logo.alt}
                                            className="w-full h-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[100px] xl:max-w-[140px] object-contain"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EcosystemContent;