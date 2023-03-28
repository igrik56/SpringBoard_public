const express = require('express')
const router = new express.Router()
itemList = require('./fakeDb')

const ExpressError = require('./expressError')


router.get('/', (req, res) => {
    return res.json({itemList})
})

router.post('/', (req, res) => {
    newItem = req.body
    itemList.push(newItem)
    return res.json({itemList})
})

router.get('/:name', (req, res) => {
    const item = itemList.find(i => i.name === req.params.name);
    return res.json({item})
})

router.post('/:name', (req, res) => {
    const item = itemList.find(i => i.name === req.params.name);
    newData = req.body
 
    item.name = newData.name
    item.price = newData.price

    console.log(`${item.name} has been updated to ${item}`)
    return res.json({newData})
})


router.delete("/:name", function(req, res) {
    const item = itemList.find(i => i.name === req.params.name);
    itemList.splice(item, 1)
    return res.json({ message: "Deleted" });
  });



module.exports = router