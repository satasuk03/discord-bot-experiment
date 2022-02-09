import { Player } from "entity/Player";
import { getManager } from "typeorm";

export const createPlayer = async (clientId: string) => {
  const newPlayer = await getManager()
    .getRepository(Player)
    .create({
      clientId,
    })
    .save();
  return newPlayer;
};

export const getPlayer = async (clientId: string) => {
  const player = await getManager().getRepository(Player).findOne({ clientId });
  return player;
};
