import cors from "cors";
import { connectionDB } from "../DB/connection.js";
import * as allRouters from "./modules/index.routes.js";
import { globalResponse } from "./utils/errorhandling.js";

export const initiateApp = (express, app) => {
  const port = process.env.PORT||5000
  app.use(express.json());
  app.use(cors());
	connectionDB();


	app.use("/auth", allRouters.authRouter);















  app.get("/", (req, res) => res.send("hello world"));
  app.all("*", (req, res, next) => {
    return next(new Error("in-valid Routing", { cause: 404 }));
  });




	app.use(globalResponse);


  app.listen(port, () => console.log(`your app is listening on port ${port}`));
};
