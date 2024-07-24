const mysql = require('mysql2')


const conn = mysql.createConnection({

    user:"root",
    host:"localhost",
    password:"Vishvajeet@123",
    database:"Crud_application"


})

conn.connect((err)=>{
    
    if(err){
        throw err ;
    }
    else {
        console.log("db connected  ")
    }

})


module.exports = conn ;