import express from "express";
import cors from "cors";
import routes from "./routes";
import logMiddleware from "./middlewares/log";

const runServer = () => {
  const PORT = process.env.PORT || 3333;
  
  const server = express();
  
  server.use(cors());
  server.use(express.json());
  server.use(logMiddleware);
  server.use(routes);
  
  server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  });

  return server

}

runServer()

export default runServer