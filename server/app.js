const  express =  require ('express')
const  app = express();

const mysql = require("mysql2");
const cors = require('cors');

const db = require('./db/connect')
const router = require('./Router/Route')

const port = 8001;


app.use(express.json())
app.use (cors()) ;
app.use(router);

app.listen(port ,()=>{
    console.log('port number 8001');
}) 

  