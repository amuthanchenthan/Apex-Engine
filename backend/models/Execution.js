import mongoose from "mongoose";

const executionSchema = new mongoose.Schema(
    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        strategyId: {

            type: Number,

            required: true,

        },

        strategy: {

            type: String,

            required: true,

        },

        pair: {

            type: String,

            required: true,

        },

        action: {

            type: String,

            enum: ["BUY", "SELL"],

            required: true,

        },

        price: {

            type: Number,

            required: true,

        },
        buyPrice: {

            type: Number,

        },

        sellPrice: {

            type: Number,

        },

        profit: {

            type: Number,

            default: 0,

        },

        roi: {

            type: Number,

            default: 0,

        },

    },
    {

        timestamps: true,

    }
);

const Execution = mongoose.model("Execution", executionSchema);

export default Execution;