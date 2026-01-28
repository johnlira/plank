import { Router } from "express";
import { authController } from "./auth.controller";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";
import { validateBody } from "../../middleware/validateBody";
import { SignUpSchema, SignInSchema } from "./auth.types";

const authRouter = Router();

authRouter.post("/signup", validateBody(SignUpSchema), authController.signUp);
authRouter.post("/signin", validateBody(SignInSchema), authController.signIn);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", ensureAuthenticated, authController.getMe);

export default authRouter;
