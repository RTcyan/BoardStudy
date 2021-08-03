const { Router } = require('express');
const Board = require('../models/board');
const Task = require('../models/task');

const router = new Router();

router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Board name must not be empty' });;
        }

        const createdBoard = new Board({ name });
        await createdBoard.save();
        res.status(201).json({ message: 'Board has been created', createdId: createdBoard.id });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
});

router.post('/:id/createTask', async (req, res) => {
    try {
        const id = req.params.id;
        const board = await Board.findById(id);
        if (!board) {
            return res.status(404).json({ message: `Board with id ${id} was not found` });
        }
        const { title, description } = req.body;
        const errors = [];
        if (!title) {
            errors.push('Title must not be empty');
        }
        if(!description) {
            errors.push('Description must not be empty');
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const task = new Task({ title, description, board });
        await task.save();
        
        board.tasks.push(task);
        await board.save();

        res.status(201).json({ message: `Task ${title} has been crated`, createdId: task.id});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const board = await Board.findById(id);
        if (board) {
            res.json({
                name: board.name,
                id: board.id,
                tasks: board.tasks,
            });
        } else {
            res.status(404).json({ message: `Board with id ${id} was not found` });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
})

module.exports = router;