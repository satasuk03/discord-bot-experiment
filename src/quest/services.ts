import { Player } from 'entity/Player';
import { getManager } from 'typeorm';
import activeQuests from './activeQuests';

export interface Quest {
  id: string;
  name: string;
  desc: string;
  xpGained?: number;
  gfCoinGained?: number;
  claim(player: Player): boolean | Promise<boolean>;
  check(player: Player): checkQuestResult | Promise<checkQuestResult>;
}

interface checkQuestResult {
  claimable: boolean;
  error?: string;
}

interface claimQuestResult {
  claimed: boolean;
  error?: string;
}

export const checkQuest = async (questId: string, clientId: string) => {
  const quest = activeQuests.find((q) => q.id === questId);
  if (!quest) {
    return { claimable: false, error: 'Quest not found!' };
  }
  const player = await getManager().getRepository(Player).findOne({ clientId });
  if (!player) {
    return { claimable: false, error: 'Player not found!' };
  }
  return await quest.check(player);
};

export const claimQuest = async (
  questId: string,
  clientId: string,
): Promise<claimQuestResult> => {
  const quest = activeQuests.find((q) => q.id === questId);
  if (!quest) {
    return { claimed: false, error: 'Quest not found!' };
  }
  const player = await getManager().getRepository(Player).findOne({ clientId });
  if (!player) {
    return { claimed: false, error: 'Player not found!' };
  }
  const { claimable, error } = await quest.check(player);
  if (!claimable) {
    return { claimed: false, error };
  }

  const claimed = await quest.claim(player);
  return { claimed };
};
