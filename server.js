const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))

app.use("/api/users",require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

//mongodb+srv://sanjayn29:sanjaynss@cluster0.ailftmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/jobportal