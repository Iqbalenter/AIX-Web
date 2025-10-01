const RoadmapContent = () => {
    return (
        <div className="roadmap-content py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-40">
            <div className="max-w-7xl mx-auto">
                <div className="title text-center">
                    <h1 className="text-md sm:text-md md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mx-auto">
                        Roadmap Innovation to Market Leadership
                    </h1>
                    <h2 className="text-md sm:text-md md:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-2 sm:mt-2.5">
                        <span className="text-yellow-300">3</span> Phase
                    </h2>
                </div>

                <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-3 xl:gap-4 mt-8 sm:mt-10">
                    <div className="card card1 text-white p-4 sm:p-5 md:p-6 lg:p-5 xl:p-6 rounded-2xl lg:rounded-3xl">
                        <h1 className="text-center text-base sm:text-lg md:text-xl lg:text-xl font-semibold px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 leading-tight">
                            Foundation & Initial Growth
                        </h1>

                        <div className="card-description text-center font-medium mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Secure Funding: Launch private sale and whitelist NFTs for early community & VC partners.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Prove Utility: Deploy AI Agents on Web & Twitter for live demonstration.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Ignite Adoption: Fuel user growth with strategic airdrops and incentive programs.
                            </h3>
                        </div>
                        <p className="text-center mt-3 sm:mt-4 font-medium text-sm sm:text-base">
                            Phase I: Foundation & Adoption
                        </p>
                    </div>

                    <div className="card card1 text-white p-4 sm:p-5 md:p-6 lg:p-5 xl:p-6 rounded-2xl lg:rounded-3xl">
                        <h1 className="text-center text-base sm:text-lg md:text-xl lg:text-xl font-semibold px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 leading-tight">
                            Ecosystem & Global Scale
                        </h1>

                        <div className="card-description text-center font-medium mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Attract Top Talent: Launch a Global AI Challenge to drive innovation.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Go Cross-Chain: Integrate with major blockchains for maximum reach.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Deploy Advanced AI: Enable complex multi-agent coordination.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Empower Developers: Release an enhanced SDK to accelerate building.
                            </h3>
                        </div>
                        <p className="text-center mt-2 sm:mt-3 font-medium text-sm sm:text-base">
                            Phase II: Ecosystem & Scale
                        </p>
                    </div>

                    <div className="card card1 text-white p-4 sm:p-5 md:p-6 lg:p-5 xl:p-6 rounded-2xl lg:rounded-3xl md:col-span-2 lg:col-span-1">
                        <h1 className="text-center text-base sm:text-lg md:text-xl lg:text-xl font-semibold px-2 sm:px-4 md:px-6 lg:px-6 xl:px-7 leading-tight">
                            Core Strategy: Growth & Market Leadership
                        </h1>

                        <div className="card-description text-center font-medium mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Multi-Chain: Deploy on Ethereum, Solana, Base.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Deep Liquidity: Strengthen the token economy.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Developer Hub: Build the #1 community for AI developers.
                            </h3>
                            <h3 className="text-xs sm:text-sm md:text-base leading-relaxed">
                                Tech Edge: Lead in advanced AI coordination.
                            </h3>
                        </div>
                        <p className="text-center mt-3 sm:mt-4 font-medium text-sm sm:text-base">
                            Phase III: Market Leadership
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoadmapContent;