import Charts from "../../../assets/Frame 11.png";

const ChartContent = () => {
    return (
        <div className="chart-content bg-zinc-900 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40">
            <div className="max-w-7xl mx-auto">
                <div className="background flex justify-center">
                    <img 
                        src={Charts} 
                        alt="AIX Trading Charts and Analytics Dashboard"
                    />
                </div>
            </div>
        </div>
    )
}

export default ChartContent;