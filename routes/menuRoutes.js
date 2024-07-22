const express = require('express');
const router = express();
const Menu = require('./../models/Menu');

 // POST menuItem
 router.post('/', async (req, res) => {
    try {
    const menuItemData = req.body;
    const menuItem = new Menu(menuItemData);
    // Save the new menu item to the database
    const savedMenuItem = await menuItem.save();
    console.log('Menu item saved');
    res.status(201).json(savedMenuItem);
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }
    });


     // GET METHOD  for Menu
router.get('/', async(req,res) =>{
        try{
            const data = await Menu.find();
            console.log('data fetched');
            res.status(200).json(data);
        }catch(err){
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    module.exports = router;