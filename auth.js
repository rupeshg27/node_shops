// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // LocalStrategy means Username & Password Strategy
const Person = require('./models/Person');

// Define and config the locaStrategy using password local
passport.use(new LocalStrategy(async (username, password, done) => {
    //Authentication logic here
    try{
        //console.log('Received credentials:', USERNAME, password);
        const user = await Person.findOne({ username });
        if(!user)
        return done(null, false, {message: 'Incorrect username.'});

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }else
            return done(null, false, {message: 'Incorrect Password.'});
        
    }catch(error){
        return done(error);
    }
 }));

 module.exports = passport;