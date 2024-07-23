const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

app.get('/', function(req, res){
    res.send('Welcome to new server')
});


      // Import the router files for Perosn
      const personRoutes = require('./routes/personRoutes');

      //Use the routers
      app.use('/person', personRoutes);

      //Import the router files for Menu
      const menuRoutes = require('./routes/menuRoutes');

      app.use('/menu', menuRoutes);

        //Import the router files for Task
        const taskRoutes = require('./routes/taskRoutes');

        app.use('/task', taskRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3001');
})