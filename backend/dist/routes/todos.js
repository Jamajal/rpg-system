"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
router.post('/', todos_1.createToDo);
//router.get('/', createToDo);
router.patch('/:id', todos_1.createToDo);
router.delete('/:id', todos_1.createToDo);
router.get('/', (req, res) => {
    res.send('Teste');
});
exports.default = router;
