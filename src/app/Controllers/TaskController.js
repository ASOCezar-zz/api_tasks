const Task = require('../Models/Task');
const yup = require('yup');

const TaskController = {

    add: async (req, res) => {

        let schema = yup.object().shape({
            name: yup.string().required(),
            date: yup.date().default(),
            description: yup.string()
          });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                message: "Dados inválidos"
            })
        }

        const numberOfTasks = await Task.countDocuments({}).exec();

        const _id = numberOfTasks + 1;
        const { name, date, description } = req.body;
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

        try {
            const taskId = req.params.id;


            const updatedTask = {
                name: req.body.name,
                date: req.body.date,
                description: req.body.description
            }


            const updateTask = async (attribute, value) => {
                const attr = attribute
                return await Task.findOneAndUpdate({_id: taskId}, {$set : { [attr] : value }})
            }

            if( updatedTask.name ) {
                await updateTask("name", updatedTask.name);
            }

            if( updatedTask.date ) {
                await updateTask("date", updatedTask.date);
            }

            if( updatedTask.description ) {
                await updateTask("description", updatedTask.description);
            }

            const result = await Task.find({_id: taskId});

            return res.status(202).json({ message: 'Success', result}).redirect('/');

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
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