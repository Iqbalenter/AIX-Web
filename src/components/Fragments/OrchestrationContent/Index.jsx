import OrchestrationImage from "../../../assets/AIX Eco.png";

const OrchestrationContent = () => {
    return (
        <div className="orchestration-content py-12 sm:py-16 md:py-24 lg:py-32 xl:py-52 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-12 items-center">
                <div className="orchestration-text order-2 lg:order-1 text-center lg:text-left py-0 sm:py-4 md:py-8 lg:py-16 xl:py-40">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold leading-tight max-w-lg mx-auto lg:mx-0">
                        Three AIX Orchestration Mechanisms
                    </h1>
                </div>
                <div className="orchestration-image order-1 lg:order-2 flex justify-center lg:justify-end">
                    <img 
                        src={OrchestrationImage} 
                        alt="AIX Orchestration Mechanisms"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default OrchestrationContent;