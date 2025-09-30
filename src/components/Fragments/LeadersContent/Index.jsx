import medanCrypto from "../../../assets/image 1.png";
import fuadCrypto from '../../../assets/Fuad 1.png';
import Fds from "../../../assets/WhatsApp Image 2025-09-23 at 19.01.34_da8d0c7e 1.png";
import Web3 from "../../../assets/image 2.png";

const LeadersContent = () => {
    return (
        <div className="leaders-content py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 sm:mb-7 md:mb-8 lg:mb-7 font-semibold leading-tight">
                    Backend by Industry Leaders
                </h1>

                <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-3 xl:gap-4">
                    <div className="card p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl transition-transform hover:scale-105">
                        <div className="image-wrapper flex justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-7">
                            <img 
                                src={medanCrypto} 
                                alt="Medan Crypto Community"
                                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-cover rounded-lg"
                            />                
                        </div>
                        <h2 className="text-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-tight">
                            Medan Crypto Community
                        </h2>
                    </div>

                    <div className="card p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl transition-transform hover:scale-105">
                        <div className="image-wrapper flex justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-7">
                            <img 
                                src={fuadCrypto} 
                                alt="Fuad Delivansyah CEO"
                                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-cover rounded-lg"
                            />
                        </div>
                        <h2 className="text-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-tight">
                            Fuad Delivansyah CEO
                        </h2>
                    </div>

                    <div className="card p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl sm:col-span-2 lg:col-span-1 transition-transform hover:scale-105">
                        <div className="image-wrapper flex justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 p-4 sm:p-6 md:p-8 lg:p-6 xl:p-8">
                            <img 
                                src={Fds} 
                                alt="PT. Fratama Dinamika Solusindo"
                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-lg"
                            />                
                        </div>
                        <h2 className="text-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-tight px-2">
                            PT. Fratama Dinamika Solusindo Supported
                        </h2>
                    </div>

                    <div className="card p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl sm:col-span-2 lg:col-span-1 transition-transform hover:scale-105">
                        <div className="image-wrapper flex justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 p-4 sm:p-6 md:p-8 lg:p-6 xl:p-8">
                            <img 
                                src={Web3} 
                                alt="PT. Fratama Dinamika Solusindo"
                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-lg"
                            />                
                        </div>
                        <h2 className="text-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-tight px-2">
                            Web3 Blockchain Medan
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadersContent;