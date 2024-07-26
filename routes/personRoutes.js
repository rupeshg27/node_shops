const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// POST Person
router.post('/signup', async (req, res) => {
    try {
    const data = req.body;
    const newPerson = new Person(data);
    // Save the new person t o the database using await
    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
        id: response.id,
        username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({response: response, token: token});
    } 
    catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

    //Login Route
    router.post('/login', async(req, res) => {
        try{
            //Extract username and password from request body
            const {username, password} = req.body;

            //Find the user by username
            const user = await Person.findOne({username: username});

            //if user does not exist or password does not match, return error
            if( !user || !(await user.comparePassword(password))){
                return res.status(401).json({error: 'Invalid username or password'})
            }
            //generate Token
            const payload = {
                id : user.id,
                username: user.username
            }
            const token = generateToken(payload);

            //return token as response
            res.json({token})
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
    });

    //Profile Route 
    router.get('/profile', jwtAuthMiddleware, async (req, res) => {
        try{
            const userData = req.user;
            console.log("User Data: ", userData);

            const userId = userData.Id;
            const user = await Person.findById(userId);

            res.status(200).json({user});
        }catch(err){
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error'});
        }
    })

    //GET METHOD TO get the person
    router.get('/', jwtAuthMiddleware, async(req,res) =>{
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
     
    //export module for exports router 
    module.exports = router;