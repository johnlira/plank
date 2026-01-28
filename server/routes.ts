import { Router, Request, Response } from "express";

const apiRouter = Router();

apiRouter.get("/", (req: Request, res: Response) => res.send("Plank Server Running"));
apiRouter.get("/health", (req: Request, res: Response) => res.send({ status: "ok" }));

export default apiRouter;