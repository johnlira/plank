import { Request, Response } from "express";
import { CreatePlantSchema } from "./plants.types";
import { createPlant } from "./services";
import { plantsRepository } from "./plants.repository";
import { UnauthorizedError, NotFoundError } from "../../err/server-errors";

export const plantsController = {
  async create(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError();

    const { nickname } = CreatePlantSchema.parse(req.body);

    const plant = await createPlant({
      userId,
      nickname,
      file: req.file,
    });

    return res.status(201).json(plant);
  },

  async list(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError();

    const plants = await plantsRepository.findByUserId(userId);

    return res.json(plants);
  },

  async getById(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError();

    const id = req.params.id as string;
    const plant = await plantsRepository.findById(id);

    if (!plant) {
      throw new NotFoundError("Plant");
    }

    // Ensure user owns this plant
    if (plant.userId !== userId) {
      throw new UnauthorizedError();
    }

    return res.json(plant);
  },

  async delete(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError();

    const id = req.params.id as string;
    const plant = await plantsRepository.findById(id);

    if (!plant) {
      throw new NotFoundError("Plant");
    }

    // Ensure user owns this plant
    if (plant.userId !== userId) {
      throw new UnauthorizedError();
    }

    await plantsRepository.delete(id);

    return res.status(204).send();
  },
};
