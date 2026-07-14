import {
  Wallet,
  Activity,
  Cpu,
  BarChart3,
} from "lucide-react";

function StatsCards({wallet}) {
  const cards = [
    {
      title: "Wallet",
      value: wallet.connected ? "Connected" : "Disconnected",

      icon: <Wallet size={28} />,
    },
    {
      title: "Strategies",
      value: "0",
      icon: <Cpu size={28} />,
    },
    {
      title: "Transactions",
      value: "0",
      icon: <Activity size={28} />,
    },
    {
      title: "Analytics",
      value: "Coming Soon",
      icon: <BarChart3 size={28} />,
    },
  ];

  return (
    <div className="stats-grid">

      {cards.map((card) => (

        <div
          key={card.title}
          className="stats-card"
        >

          <div className="stats-icon">

            {card.icon}

          </div>

          <h3>{card.value}</h3>

          <p>{card.title}</p>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;