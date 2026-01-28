import { Router, Request, Response } from "express";
import authRouter from "./auth/auth.routes";

const apiRouter = Router();

apiRouter.get("/", (req: Request, res: Response) => res.send("Plank Server Running"));
apiRouter.get("/health", (req: Request, res: Response) => res.send({ status: "ok" }));

apiRouter.use("/auth", authRouter);

export default apiRouter;