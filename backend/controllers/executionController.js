import Execution from "../models/Execution.js";

export const saveExecution = async (req, res) => {

    try {

        const execution = await Execution.create({

            userId: req.user.id,

            strategyId: req.body.strategyId,

            strategy: req.body.strategy,

            pair: req.body.pair,

            action: req.body.action,

            price: req.body.price,

            buyPrice: req.body.buyPrice,

            sellPrice: req.body.sellPrice,

            profit: req.body.profit,

            roi: req.body.roi,

        });

        res.status(201).json({

            success: true,

            execution,

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};

export const getExecutions = async (req, res) => {

    try {

        const executions = await Execution.find({

            userId: req.user.id,

        }).sort({

            createdAt: -1,

        });

        res.status(200).json({

            success: true,

            executions,

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};
export const getLatestBuy = async (req, res) => {

    try {

        const execution = await Execution.findOne({

            userId: req.user.id,

            strategyId: req.params.strategyId,

            action: "BUY",

        }).sort({

            createdAt: -1,

        });
        res.json(execution);

    }

    catch (err) {

        res.status(500).json({

            message: err.message,

        });

    }

};