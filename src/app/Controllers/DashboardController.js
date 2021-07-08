const Task = require('../Models/Task');

const DashboardController = {

    index: async (req, res) => {
        let tasks = await Task.find();

        return res.status(200).json({tasks});
    }
}

module.exports = DashboardController;