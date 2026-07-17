import { useEffect, useState } from "react";

function MarketWidget() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {

        loadPrices();

        const interval = setInterval(loadPrices, 30000);

        return () => clearInterval(interval);

    }, []);

    const loadPrices = async () => {

        try {

            const res = await fetch(

                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana"

            );

            const data = await res.json();

            setCoins(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="dashboard-card">

            <h4>Live Crypto Market</h4>

            <br/>

            {

                coins.map((coin)=>(

                    <div
                        key={coin.id}
                        className="d-flex justify-content-between align-items-center mb-3"
                    >

                        <div>

                            <strong>

                                {coin.symbol.toUpperCase()}

                            </strong>

                            <br/>

                            <small>

                                {coin.name}

                            </small>

                        </div>

                        <div style={{textAlign:"right"}}>

                            <strong>

                                ${coin.current_price.toLocaleString()}

                            </strong>

                            <br/>

                            <span
                                style={{
                                    color:
                                        coin.price_change_percentage_24h >=0
                                        ? "#00ff99"
                                        : "#ff4d4f"
                                }}
                            >

                                {coin.price_change_percentage_24h.toFixed(2)}%

                            </span>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default MarketWidget;