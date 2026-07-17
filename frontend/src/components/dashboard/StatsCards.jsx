import {
  Wallet,
  Cpu,
  Activity,
  ShieldCheck,
} from "lucide-react";

function StatsCards({ wallet, strategyCount }) {

  const cards = [

    {
      title: "Wallet",
      value: wallet.connected ? "Connected" : "Disconnected",
      icon: <Wallet size={28} />,
    },

    {
      title: "Strategies",
      value: strategyCount,
      icon: <Cpu size={28} />,
    },

    {
      title: "Network",
      value: wallet.network || "--",
      icon: <Activity size={28} />,
    },

    {
      title: "Contract",
      value: "Active",
      icon: <ShieldCheck size={28} />,
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