import { Router } from "express";
import { plantsController } from "./plants.controller";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";
import { upload } from "../../config/upload";

const plantsRouter = Router();

// All routes require authentication
plantsRouter.use(ensureAuthenticated);

// POST /plants - Create a new plant
plantsRouter.post("/", upload.single("image"), plantsController.create);

// GET /plants - List all plants for the user
plantsRouter.get("/", plantsController.list);

// GET /plants/:id - Get a specific plant
plantsRouter.get("/:id", plantsController.getById);

// DELETE /plants/:id - Delete a plant
plantsRouter.delete("/:id", plantsController.delete);

export default plantsRouter;
