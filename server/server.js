import express from 'express';
import bodyParser from "body-parser";

const app = express();
app.use(express.static("../client/dist"));
app.use(bodyParser.json());



const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});