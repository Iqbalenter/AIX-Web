import EconomicBitcoin from "../../../assets/Paragraph+Background.png";
import EconomicWallet from "../../../assets/wallet btc.png";

const EconomicContent = () => {
    return (
        <div className="economic-content py-8 sm:py-12 md:py-16 lg:py-20 xl:py-5 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-30">
            <div className="max-w-7xl mx-auto">
                <div className="economic-text mb-8 sm:mb-10 md:mb-12 lg:mb-10">
                    <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight">
                        The Economic Engine for
                    </h1>
                    <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight">
                        Autonomous <span className="text-yellow-300">AI</span>
                    </h1>
                </div>

                <div className="cards grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-3 xl:gap-4">
                    <div
                        className="card rounded-xl sm:rounded-2xl py-6 sm:py-8 md:py-10 pl-6 sm:pl-8 md:pl-10 pr-6 sm:pr-12 md:pr-20 lg:pr-32 xl:pr-40 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[220px] xl:min-h-[260px] relative overflow-hidden"
                        style={{
                            backgroundImage: `
                            url(${EconomicBitcoin}),
                            linear-gradient(180deg, rgba(92,74,21,1) 0%, rgba(61,43,3,1) 80%)
                            `,
                            backgroundPosition: 'right center, 0 0',
                            backgroundSize: 'auto 80%, cover',
                            backgroundRepeat: 'no-repeat, no-repeat'
                        }}
                    >
                        <div className="card-text max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10">
                            <h4 className="text-[#E9D146] text-sm sm:text-base md:text-lg font-medium">
                                Traders
                            </h4>
                            <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mt-3 sm:mt-4 md:mt-5 mr-4 sm:mr-8 md:mr-12 lg:mr-16 xl:mr-20 leading-tight">
                                Permissionless asset diversity
                            </h1>
                            <p className="text-white text-xs sm:text-sm md:text-base mt-3 sm:mt-4 md:mt-5 leading-relaxed">
                                AI Agent AIX: The intelligent backbone of the decentralized
                                derivatives market. Capable of engaging with all asset classes—from
                                traditional crypto to NFTs, AI models, and beyond—it unlocks a new
                                era of expansive, automated trading and service provision
                            </p>
                        </div>
                    </div>

                    <div
                        className="card rounded-xl sm:rounded-2xl py-6 sm:py-8 md:py-10 pl-6 sm:pl-8 md:pl-10 pr-6 sm:pr-12 md:pr-20 lg:pr-32 xl:pr-40 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[220px] xl:min-h-[260px] relative overflow-hidden"
                        style={{
                            backgroundImage: `
                            url(${EconomicWallet}),
                            linear-gradient(180deg, rgba(92,74,21,1) 0%, rgba(61,43,3,1) 80%)
                            `,
                            backgroundPosition: 'right center, 0 0',
                            backgroundSize: 'auto 80%, cover',
                            backgroundRepeat: 'no-repeat, no-repeat'
                        }}
                    >
                        <div className="card-text max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10">
                            <h4 className="text-[#E9D146] text-sm sm:text-base md:text-lg font-medium">
                                Liquidity Providers
                            </h4>
                            <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mt-3 sm:mt-4 md:mt-5 mr-4 sm:mr-8 md:mr-12 lg:mr-16 xl:mr-20 leading-tight">
                                Efficiency beyond compare
                            </h1>
                            <p className="text-white text-xs sm:text-sm md:text-base mt-3 sm:mt-4 md:mt-5 leading-relaxed">
                                Leveraging advanced algorithms, AI Agent AIX is engineered to optimize liquidity. It provides a customizable toolset, including concentrated liquidity and intelligent limit orders, empowering users to deploy robust, AI-driven LP strategies
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EconomicContent;