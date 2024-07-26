const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the person schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash Password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
try{
    // USE bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}catch(err){
    throw err;
}

}
// Create Person Model
const Person =  mongoose.model('Person',personSchema);
module.exports = Person;