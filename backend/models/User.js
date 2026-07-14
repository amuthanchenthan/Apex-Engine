import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      default: "",
      trim: true,
    },

    network: {
      type: String,
      default: "",
      trim: true,
    },

    balance: {
      type: String,
      default: "",
    },

    connected: {
      type: Boolean,
      default: false,
    },

    connectedAt: {
      type: Date,
      default: null,
    },

    lastVerified: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    wallet: {
      type: walletSchema,
      default: () => ({}),
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;