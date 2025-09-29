// src/pages/Trading.jsx
import { useNavigate, useParams } from "react-router-dom";
import TradingHeader from "../components/Fragments/TradingContent/TradingHeader";
import LeftPane from "../components/Fragments/TradingContent/LeftPane";
import TradeForm from "../components/Fragments/TradingContent/TradeForm";
import { getBase } from "../lib/binance";
import NavbarTrading from "../components/Layouts/NavbarTrading";

export default function Trading() {
  const { symbol } = useParams();
  const navigate = useNavigate();

  if (!symbol) {
    return (
      <div className="p-6 text-zinc-200">
        <p>No symbol selected.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-3 py-2 rounded-lg border border-zinc-700 text-sm hover:bg-zinc-800"
        >
          Back
        </button>
      </div>
    );
  }
    const sym = symbol.toUpperCase();
  const base = getBase(symbol.toUpperCase());

  return (
    <div className="charts-page text-zinc-100 min-h-screen px-2 sm:px-2 lg:px-6">
    <NavbarTrading/>
      <div className="max-w-7xl mx-auto">

        {/* Header dengan onSelectSymbol -> navigate */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-4">
          <TradingHeader
            symbol={sym}
            onSelectSymbol={(newSym) => navigate(`/charts/${newSym.toUpperCase()}`)}
          />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9">
            <LeftPane symbol={sym} />
          </div>
          <div className="lg:col-span-3">
            <TradeForm base={base} quote="USDC" balance={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
