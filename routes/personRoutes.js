const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST Person
router.post('/', async (req, res) => {
    try {
    const data = req.body;
    const newPerson = new Person(data);
    // Save the new person t o the database using await
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    } 
    catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }
    });


    //GET METHOD TO get the person
    router.get('/', async(req,res) =>{
        try{
            const data = await Person.find();
            console.log('data fetched');
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


      // Parametrised API calls

      router.get('/:workType', async(req, res) => {
        try{
            const workType = req.params.workType;
            if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
                const response = await Person.find({work: workType});
                console.log('response fetched');
                res.status(200).json(response);
            }else{
                res.status(404).json({error: 'Invalid work type'});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
    })


    // Put Method for update data 

    router.put('/:id', async(req, res) => {
try{
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true,
        runValidators: true,
    })
    if(!response){
        return res.status(404).json({error: 'Person not found'});
    }
}catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
}
    })

    // DELETE Method for delete data 
    router.delete('/:id', async(req, res) => {
        try{
            const personId = req.params.id;
           
            //Assuming ypu have a Person Model
            const response = await Person.findByIdAndDelete(personId);
       if(!response){
        return res.status(404).json({ error : 'Person not found'});
       }
       console.log('data delete');
       res.status(200).json({message: "Person Deleted Successfully"});
        }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
}
    })
     
    module.exports = router;