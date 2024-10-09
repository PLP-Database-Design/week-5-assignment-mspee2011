//import our dependencies
const express = require("express");
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv');

app.use(express.json())
dotenv.config()


//configure environment variables
dotenv.config();
//connection
const db = mysql.createConnection(
    {
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
})
//test connection
db.connect((err) =>{
    // connect not succeful
    if (err){
       return  console.log("error connecting to databbse:",err)
    }
///connection is scussful
console.log("successfully connected to mysql:", db.threadid)
})
//retrieve all patients
app.get(' ', (req , res)=>{
    const getPatients = "SELECT patient_id,first_name, last_name,date_of_birth FROM patients "
    db.query(getPatients, (err, data) =>{
        //if i have error
        if(err){
            return res.status(400).send("failed to get patients",err)
        }
        return res.status(200).send(data)
    })
})
//retrieve all providers
app.get('/providers',(req , res) =>
    {
const getProviders = "SELECT first_name, last_name , provider_specialty FROM providers "
db.query(getProviders,(err , data)=>
{
    //if there is error
    if(err){
        return res.status(500).send("failed to get providers" ,err)
    }
    return res.status(200).send(data)
}
)

    })
//retrieve patients by their first name
app.get('/patients/first_name', (req, res) => {  
    const getPatients = "SELECT first_name FROM patients" 
    db.query(getPatients, (err, data) =>{
        //if i have error
        if(err){
            return res.status(400).send("failed to get patients fiirst_name",err)
        }
        return res.status(200).send(data)
    })
});  
//retrieve all providers by their specialty
app.get('/providers/specialty ', (req, res) => {  
    const getProviders = "SELECT provider_specialty FROM  providers";  
    db.query(getProviders,(err , data)=>
        {
            //if there is error
            if(err){
                return res.status(500).send("failed to get providers" ,err)
            }
            return res.status(200).send(data)
        }
        )
        
            }) 
    

//start and listen to the server
app.listen(3300,() =>{
    console.log('server is runnig on http://localhost:${PORT}')
})