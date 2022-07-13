import express from "express";
import cors from 'cors'
import routes from "./routes";
import logMiddleware from "./middlewares/log";


function runServer() {
    
    const server = express();

    server.use(cors());
    server.use(express.json());
    server.use(logMiddleware)
    server.use(routes);

    server.listen(3333, ()=>{
        console.log('Server is running!')
    });
}

runServer()