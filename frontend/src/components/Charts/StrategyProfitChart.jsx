import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ReferenceLine,
} from "recharts";

function StrategyProfitChart({ executions }) {

    const strategyMap = {};

    executions
        .filter(item => item.action === "SELL")
        .forEach(item => {

            if (!strategyMap[item.strategy]) {

                strategyMap[item.strategy] = 0;

            }

            strategyMap[item.strategy] += Number(item.profit);

        });

    const data = Object.keys(strategyMap).map(name => ({

        strategy: name,

        profit: strategyMap[name],

    }));

    return (

        <div className="chart-card" style={{ marginTop: 40 }}>

            <h2 style={{ marginBottom: 20 }}>

                Profit By Strategy

            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={data}>

                    <XAxis dataKey="strategy" />

                    <YAxis />

                    <ReferenceLine
                        y={0}
                        stroke="#9CA3AF"
                    />

                    <Tooltip
                        formatter={(value) => [

                            `$${Number(value).toFixed(2)}`,

                            "Profit",

                        ]}
                    />

                    <Bar dataKey="profit">

                        {

                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        entry.profit >= 0
                                            ? "#22C55E"
                                            : "#EF4444"
                                    }
                                />

                            ))

                        }

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default StrategyProfitChart;