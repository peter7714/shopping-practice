const express = require('express');
const router = new express.Router();
const HandleError = require('../handleError');
const items = require('../fakeDb')

router.get('/', (req, res) => {
    res.json({items});
})

router.post('/', (req, res, next) => {
    try {
        if(!req.body.name) throw new HandleError('Name is required', 404);
        const newItem = {
            name: req.body.name,
            price: req.body.price
        };
        items.push(newItem);
        res.status(201).json({item: newItem});
    } catch(e){
        next(e)
    }
})

router.get('/:name', (req, res) => {
    const findItem = items.find(item => item.name === req.params.name);
    if(findItem === undefined){
        throw new HandleError('Item Not Found', 404);
    }
    res.json({item: findItem})
})

router.patch('/:name', (req, res) => {
    const findItem = items.find(item => item.name === req.params.name);
    if(findItem === undefined){
        throw new HandleError('Item Not Found', 404);
    }
    findItem.name = req.body.name;
    findItem.price = req.body.price;
    res.json({item: findItem});
});

router.delete('/:name', (req, res) => {
    const findItem = items.findIndex(item => item.name === req.params.name);
    if(findItem === -1){
        throw new HandleError('Item Not Found', 404);
    }
    items.splice(findItem, 1);
    res.json({message: 'Deleted'});
});

module.exports = router;