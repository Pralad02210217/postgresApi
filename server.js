 const express = require('express');
 const cors = require('cors');
 const studentRoutes = require('./src/student/routes');
 const app = express();
 const port = 3000;

 app.use(express.json());

 app.get("/", (req, res)=>{
    res.send("Hello world");
 })
 app.get("/simple", (req, res) => {
   const response = { message: "Working" };
   res.json(response);
 });
 

 app.use(cors({ origin: '*' }));
 
 app.use('/api/v1/students', studentRoutes);

 app.listen(port, ()=> console.log(`app listening on port ${port}`));
 