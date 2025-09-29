const FeatureContent = () => {
    return (
        <div className="feature-content py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-30">
            <div className="max-w-7xl mx-auto">
                <div className="feature-header text-center mb-8 sm:mb-10 md:mb-12 lg:mb-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-semibold leading-tight">
                        Designed for every trader
                    </h1>
                    <p className="text-yellow-300 mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                        Our unique AMM design and streamlined user experience cater to all kinds of traders.
                    </p>
                </div>

                <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-2.5 xl:gap-4">
                    <div className="card1 p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl border border-yellow-300 min-h-[500px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-[500px] xl:min-h-[520px]">
                        <div className="card-header flex items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                            <div className="w-1 h-12 sm:h-14 md:h-16 bg-yellow-300 mr-4 sm:mr-6 md:mr-7 flex-shrink-0"></div>
                            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl leading-tight">
                                30-second listings
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="text-yellow-300 text-sm sm:text-base md:text-lg leading-relaxed">
                                A single-token liquidity model that enables users to freely list and trade any asset in seconds, without centralized intervention or DAO proposals.
                            </p>
                        </div>
                    </div>

                    <div className="card2 p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl border border-yellow-300 min-h-[500px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-[500px] xl:min-h-[520px]">
                        <div className="card-header flex items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                            <div className="w-1 h-12 sm:h-14 md:h-16 bg-yellow-300 mr-4 sm:mr-6 md:mr-7 flex-shrink-0"></div>
                            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl leading-tight">
                                Unified liquidity
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="text-yellow-300 text-sm sm:text-base md:text-lg leading-relaxed">
                                An innovative new liquidity paradigm that seamlessly integrates active and passive liquidity provisions, offering a unified liquidity system tailored to all.
                            </p>
                        </div>
                    </div>

                    <div className="card3 p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl border border-yellow-300 min-h-[500px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-[500px] xl:min-h-[520px] md:col-span-2 lg:col-span-1">
                        <div className="card-header flex items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                            <div className="w-1 h-12 sm:h-14 md:h-16 bg-yellow-300 mr-4 sm:mr-6 md:mr-7 flex-shrink-0"></div>
                            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl leading-tight">
                                Secure & Transparent
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="text-yellow-300 text-sm sm:text-base md:text-lg leading-relaxed">
                                Built on blockchain technology with advanced security protocols and full transparency. Every transaction is verifiable and immutable, ensuring trust and reliability for all traders.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureContent;