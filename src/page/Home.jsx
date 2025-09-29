import ChartContent from "../components/Fragments/ChartContent/Index";
import DemoContent from "../components/Fragments/DemoContent/Index";
import DescriptionContent from "../components/Fragments/DescriptionContent";
import EconomicContent from "../components/Fragments/EconomicContent/Index";
import EcosystemContent from "../components/Fragments/EcosystemContent/Index";
import FeatureContent from "../components/Fragments/FeatureContent/Index";
import Header from "../components/Fragments/HeaderContent/Index";
import LeadersContent from "../components/Fragments/LeadersContent/Index";
import OrchestrationContent from "../components/Fragments/OrchestrationContent/Index";
import RoadmapContent from "../components/Fragments/RoadmapContent/Index";
import SosmedContent from "../components/Fragments/SosmedContent/Index";
import TheLastestContent from "../components/Fragments/TheLastestContent/Index";
import Footer from "../components/Layouts/Footer";
import Navbar from "../components/Layouts/Navbar";

import '../style/Home.css';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Header/>
            <DemoContent/>
            <DescriptionContent/>
            <RoadmapContent/>
            <LeadersContent/>
            <EconomicContent/>
            <OrchestrationContent/>
            <FeatureContent/>
            <ChartContent/>
            <EcosystemContent/>
            <TheLastestContent/>
            <SosmedContent/>
            <Footer/>
        </div>
    )
}

export default Home;