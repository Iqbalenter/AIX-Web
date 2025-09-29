import Header from "../components/Fragments/TradingContent/Header";
import ListCoin from "../components/Fragments/TradingContent/ListCoin";
import NavbarTrading from "../components/Layouts/NavbarTrading";

import "../style/Trading.css";

const Trading = () => {
    return (
        <div className="trading-page">
            <NavbarTrading/>
            <Header/>
            <ListCoin/>
        </div>
    )
}

export default Trading;