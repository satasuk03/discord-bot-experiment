import { Player } from 'entity/Player';
import { getPlayer } from 'player/services';
import { addDays } from 'utils/dateUtils';
import { Quest } from '../services';

export const DailyQuest: Quest = {
  id: 'daily',
  name: 'Daily Quest',
  desc: 'A daily quest',
  xpGained: 50,
  gfCoinGained: 100,
  claim: async (player: Player) => {
    player.lastDailyQuest = new Date();
    player.gfCoinBalance += 100;
    player.xp += 50;
    await player.save();
    return true;
  },
  check: (player: Player) => {
    const claimable = addDays(player.lastDailyQuest, 1) < new Date();
    if (!claimable) {
      return {
        claimable,
        error: `Next claim at ${addDays(player.lastDailyQuest, 1)}`,
      };
    }
    return {
      claimable,
    };
  },
};

export const claimDailyQuest = async (clientId: string) => {
  const player = await getPlayer(clientId);
  if (!player) {
    return false;
  }
  player.lastDailyQuest = new Date();
  player.gfCoinBalance += 100;
  player.xp += 50;
  await player.save();
  return true;
};
