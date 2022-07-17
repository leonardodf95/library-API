import express from "express";
import cors from "cors";
import routes from "./routes";
import logMiddleware from "./middlewares/log";

const runServer = () => {
  const server = express();
  
  server.use(cors());
  server.use(express.json());
  server.use(logMiddleware);
  server.use(routes);
  
  server.listen(() => {
    console.log("Server is running!");
  });

  return server

}

runServer()

export default runServer