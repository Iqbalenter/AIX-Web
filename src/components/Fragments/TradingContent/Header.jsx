import BackgroundImage from "../../../assets/Banner AIX.png";

const Header = () => {
    return (
        <div className="trading-header-content w-full rounded-lg sm:rounded-xl overflow-hidden mt-3 sm:mt-4 px-4 sm:px-6 md:px-8 lg:px-4 xl:px-4">
            <section>
                <div 
                    className="bg-cover bg-center bg-no-repeat text-white rounded-xl sm:rounded-2xl border border-amber-200 shadow-lg"
                    style={{ 
                        backgroundImage: `url(${BackgroundImage})`,
                        minHeight: '140px',
                    }}
                >
                    {/* Content can be added here if needed */}
                </div>
            </section>
        </div>
    )
}

export default Header;