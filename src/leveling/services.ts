import { createPlayer, getPlayer } from "player/services";

export const calXpNeeded = (level: number) => {
  return Math.ceil(
    0.04 * Math.pow(level, 3) + 0.8 * Math.pow(level, 2) + Math.pow(2, level)
  );
};

export const addXP = async (clientId: string, xpToAdd: number) => {
  // console.log(readXp);
  let player = await getPlayer(clientId);
  if (!player) {
    player = await createPlayer(clientId);
  }

  player.xp = xpToAdd + player.xp;
  let needToLevelUp = calXpNeeded(player.level);

  let isLevelUp = false;
  while (player.xp >= needToLevelUp) {
    player.level += 1;
    player.xp -= needToLevelUp;

    isLevelUp = true;
  }
  await player.save();
  return isLevelUp;
};
