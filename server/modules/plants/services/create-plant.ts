import { plantsRepository } from "../plants.repository";
import { Plant } from "../plants.types";
import { BadRequestError } from "../../../err/server-errors";

interface CreatePlantParams {
  userId: string;
  nickname: string;
  file: Express.Multer.File | undefined;
}

export async function createPlant({
  userId,
  nickname,
  file,
}: CreatePlantParams): Promise<Plant> {
  if (!file) {
    throw new BadRequestError("Image is required");
  }

  const plant = await plantsRepository.create(userId, {
    nickname,
    originalImagePath: file.path,
  });

  // TODO: Trigger AI Background Job (BullMQ) here
  // Example: await aiQueue.add('identify-plant', { plantId: plant.id });

  return plant;
}
