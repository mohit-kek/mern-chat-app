const express = require("express");
const { chats } = require("./data/dummyData")
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")

const app = express();

dotenv.config();

connectDB();

app.use(express.json()); // to accept JSON Data

app.use(cors())

app.get("/", (req, res) => {
    res.send("APi is running")
})

// app.get("/api/chat", (req, res) => {
//     res.send(chats);
// })

// app.get('/api/chat/:id', (req, res) => {
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// })

app.use('/api/user', userRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server on PORT ${PORT}`))