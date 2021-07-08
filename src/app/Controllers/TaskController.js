const Task = require('../Models/Task');
const yup = require('yup');

const TaskController = {

    add: async (req, res) => {

        let schema = yup.object().shape({
            _id: yup.number().required(),
            name: yup.string().required(),
            date: yup.date().default(),
            description: yup.string()
          });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const { _id, name, date, description } = req.body;
        const data = { _id, name, date, description };

        await Task.create(data, (error) => {
            if(error) return res.status(400).json({ message: error.message })
            return res.status(201).json({ message: 'Success'})
        })
    },

    show: async (req, res) => {
        const taskId = req.params.id;
        let task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({
                message: 'Task not Found'
            })
        }

        return res.status(200).json({
            task
        })
    },

    update: async (req, res) => {

        const taskId = req.params.id;

        const updatedTask = {
            name: req.body.name,
            date: req.body.date,
            description: req.body.description
        }

        if(updatedTask.name) {
            await Task.findOneAndUpdate({_id: taskId}, {$set : {"name" : updatedTask.name}}, (err) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                }
            })
        }


        if(updatedTask.date){
            await Task.findOneAndUpdate({_id: taskId}, {$set : {"date" : updatedTask.date}}, (err) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                }
            })
        }

        if(updatedTask.description){
            await Task.findOneAndUpdate({_id: taskId}, {$set : {"description" : updatedTask.description}}, (err) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                }
            })
        }
            
        return res.status(202).json({ message: 'Success'}).redirect('/')

    },

    delete: async (req, res) => {
        taskId = req.params.id;
        Task.remove( { _id: taskId }, (err) => {
            if (err) res.status(400).json({ message: err.message });
            res.status(200).json({ message: 'Item Deleted'})
        })
    }
}

module.exports = TaskController;