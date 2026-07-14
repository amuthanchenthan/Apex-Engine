import User from "../models/User.js";

/* =====================================================
   Connect Wallet
===================================================== */

export const connectWallet = async (req, res) => {

  try {

    const { address, network, balance } = req.body;

    /* -----------------------------
       Validation
    ------------------------------ */

    if (!address || !network) {

      return res.status(400).json({
        success: false,
        message: "Wallet address and network are required.",
      });

    }

    /* -----------------------------
       Check if wallet belongs
       to another account
    ------------------------------ */

    const existingWallet = await User.findOne({
      "wallet.address": address,
      _id: { $ne: req.user.id },
    });

    if (existingWallet) {

      return res.status(409).json({
        success: false,
        message:
          "This wallet is already connected to another Apex Engine account.",
      });

    }

    /* -----------------------------
       Update current user
    ------------------------------ */

    const updatedUser = await User.findByIdAndUpdate(

      req.user.id,

      {
        wallet: {

          address,

          network,

          balance,

          connected: true,

          connectedAt: new Date(),

          lastVerified: new Date(),

        },

      },

      {

        returnDocument: "after",

      }

    );

    return res.status(200).json({

      success: true,

      message: "Wallet connected successfully.",

      wallet: updatedUser.wallet,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Unable to connect wallet.",

    });

  }

};

/* =====================================================
   Disconnect Wallet
===================================================== */

export const disconnectWallet = async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(

      req.user.id,

      {

        wallet: {

          address: "",

          network: "",

          balance: "",

          connected: false,

          connectedAt: null,

          lastVerified: null,

        },

      },

      {

        returnDocument: "after",

      }

    );

    return res.status(200).json({

      success: true,

      message: "Wallet disconnected.",

      wallet: updatedUser.wallet,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Unable to disconnect wallet.",

    });

  }

};

/* =====================================================
   Get Current Wallet
===================================================== */

export const getWallet = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("wallet");

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found.",

      });

    }

    return res.status(200).json({

      success: true,

      wallet: user.wallet,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Unable to fetch wallet.",

    });

  }

};