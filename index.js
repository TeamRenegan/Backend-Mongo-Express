

require('dotenv').config(); 

const  connectDB  = require('./db/connection'); 


const app = require('./app');
const PORT = process.env.PORT || 3001;


connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT} port and connected to Database`);
  });
}).catch(err=>console.log(err));
