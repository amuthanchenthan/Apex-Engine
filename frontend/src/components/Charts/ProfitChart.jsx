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

const ProfitChart = ({ executions }) => {

    const data = executions
        .filter(item => item.action === "SELL")
        .map((item, index) => ({
            id: index + 1,
            strategy: item.strategy,
            date: new Date(item.createdAt || item.time).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                }
            ),
            profit: Number(item.profit || 0),
            roi: Number(item.roi || 0),
        }));

    return (
        <div className="chart-card">

            <h2 style={{ marginBottom: "20px" }}>
                Profit / Loss Per Trade
            </h2>

            <ResponsiveContainer width="100%" height={420}>

                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 30,
                    }}
                >

                    {/* No distracting background grid */}

                    <XAxis
                        dataKey="id"
                        tick={{ fill: "#BFC9D9", fontSize: 14 }}
                        label={{
                            value: "Trade Number",
                            position: "insideBottom",
                            fill: "#BFC9D9",
                        }}
                    />

                    <YAxis
                        tick={{ fill: "#BFC9D9" }}
                    />

                    <ReferenceLine
                        y={0}
                        stroke="#9CA3AF"
                        strokeWidth={2}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                        contentStyle={{
                            background: "#182848",
                            border: "1px solid #3056D3",
                            borderRadius: "10px",
                            color: "white",
                        }}
                        formatter={(value) => [
                            `$${Number(value).toFixed(2)}`,
                            "Profit / Loss",
                        ]}
                        labelFormatter={(label, payload) => {

                            if (!payload || !payload.length)
                                return "";

                            const trade = payload[0].payload;

                            return (
                                <>
                                    <strong>{trade.strategy}</strong>
                                    <br />
                                    {trade.date}
                                    <br />
                                    ROI : {trade.roi.toFixed(2)}%
                                </>
                            );

                        }}
                    />

                    <Bar
                        dataKey="profit"
                        radius={[6, 6, 0, 0]}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={
                                    entry.profit >= 0
                                        ? "#22C55E"
                                        : "#EF4444"
                                }
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
};

export default ProfitChart;