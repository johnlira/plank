import { Router, Request, Response } from "express";
import authRouter from "./modules/auth/auth.routes";
import plantsRouter from "./modules/plants/plants.routes";

const apiRouter = Router();

apiRouter.get("/", (req: Request, res: Response) =>
  res.send("Plank Server Running"),
);
apiRouter.get("/health", (req: Request, res: Response) =>
  res.send({ status: "ok" }),
);

apiRouter.use("/auth", authRouter);
apiRouter.use("/plants", plantsRouter);

export default apiRouter;
