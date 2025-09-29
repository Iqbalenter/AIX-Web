import DemoVideo from "../../../assets/DemoVideo.mp4"

const DemoContent = () => {
    return (
        <div className="demo-content text-center bg-white dark:bg-zinc-900 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-zinc-800 dark:text-zinc-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    Permissionless Perps & Futures
                </h1>
                
                <p className="text-zinc-600 dark:text-white mt-4 sm:mt-6 md:mt-8 lg:mt-9 text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
                    Trade an endless array of assets and freely list new pairs in under 30 seconds.
                </p>

                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="rounded-xl sm:rounded-2xl lg:rounded-3xl w-full max-w-5xl mx-auto shadow-2xl"
                    >
                        <source src={DemoVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
}

export default DemoContent;