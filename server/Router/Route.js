const express = require('express')
const router = new express.Router();
const conn = require('../db/connect');



router.post('/create',(req,res)=>{
   

const {name ,email ,age , mobile ,work , add , desc}= req.body;


if (!name || !email || !age || !mobile || !work || !add || !desc)

{
res.status(422).json("please fill all the data fields ")
}


try {
    conn.query("SELECT * FROM user WHERE email=?",email ,(err,result)=>{

if(result.length){

    res.status(422).json("THIS DATA IS ALREADY registered ");
}

else {
    
    const query = "INSERT INTO user (`name`, `email`, `age`, `mobile`, `work`, `add`, `desc`) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const values = [name, email, age, mobile, work, add, desc];

                conn.query(query, values, (err, result) => {
                    if (err) {
                        console.log('error', err);
                        return res.status(500).json({ error: err.message });
                    } else {
                        return res.status(200).json(req.body);
 }
    })
}


    })
} catch (error) {
    res.status(error);
    
}

}
)



// update users api


router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE user SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});





router.get('/getusers', (req, res) => {
    conn.query('SELECT * FROM user ', (err, result) => {
        if (err) {
            res.status(422).json({ message: "No data available" });k
        } else {
            res.status(200).json(result);
        }
    });
});




router.delete("/deleteuser/:id", (req, res) => {
    const { id } = req.params;

    console.log("Attempting to delete user with id:", id); 

    conn.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err); 
            res.status(422).json({ message: "Error deleting user" });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }
    });
});




router.get("/induser/:id", (req, res) => {
    const { id } = req.params;

    conn.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(422).json({ error: err.message }); // Send error message
        } else {
            if (result.length > 0) {
                res.status(200).json(result); // Send user data if found
            } else {
                res.status(404).json({ message: "User not found" }); // Handle case where no user is found
            }
        }
    });
});




module.exports = router;   