import { Copy, CheckCircle, LogOut, Wallet } from "lucide-react";
import { useState } from "react";

function WalletCard({

  wallet,

  loading,

  connectWallet,

  disconnectWallet,

}) {

  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {

    if (!wallet.address) return;

    await navigator.clipboard.writeText(wallet.address);

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  return (

    <div className="dashboard-card">

      <h4 className="mb-4">

        Wallet Status

      </h4>

      {!wallet.connected ? (

        <>

          <p
            style={{
              color: "#EF4444",
              fontWeight: 600,
            }}
          >
            🔴 Wallet Not Connected
          </p>

          <button
            className="btn btn-primary mt-3 w-100"
            onClick={connectWallet}
            disabled={loading}
          >

            <Wallet size={18} />

            <span className="ms-2">

              {loading
                ? "Connecting..."
                : "Connect Wallet"}

            </span>

          </button>

        </>

      ) : (

        <>

          <p
            style={{
              color: "#22C55E",
              fontWeight: 600,
            }}
          >
            🟢 Wallet Connected
          </p>

          <div className="mt-4">

            <small className="text-secondary">

              Wallet Address

            </small>

            <div
              className="d-flex justify-content-between align-items-center mt-2"
            >

              <strong>

                {wallet.address.slice(0, 6)}

                ...

                {wallet.address.slice(-4)}

              </strong>

              <button
                className="btn btn-sm btn-outline-light"
                onClick={copyAddress}
              >

                {copied

                  ? <CheckCircle size={16} />

                  : <Copy size={16} />}

              </button>

            </div>

          </div>

          <div className="mt-4">

            <small className="text-secondary">

              Network

            </small>

            <h6 className="mt-1">

              {wallet.network}

            </h6>

          </div>

          <div className="mt-4">

            <small className="text-secondary">

              Balance

            </small>

            <h6 className="mt-1">

              {wallet.balance} ETH

            </h6>

          </div>

          <button
            className="btn btn-danger w-100 mt-4"
            onClick={disconnectWallet}
          >

            <LogOut size={18} />

            <span className="ms-2">

              Disconnect Wallet

            </span>

          </button>

        </>

      )}

    </div>

  );

}

export default WalletCard;