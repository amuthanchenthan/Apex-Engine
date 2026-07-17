import User from "../models/User.js";

export const saveStages = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        user.strategyStages = req.body;

        await user.save();

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const getStages = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        res.json({

            success: true,

            stages: user.strategyStages || {}

        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};