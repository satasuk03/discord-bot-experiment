import { Inventory } from 'entity/Inventory';
import { Player } from 'entity/Player';
import { getPlayer } from 'player/services';
import { getManager } from 'typeorm';

export interface Item {
  itemId: number;
  type: 'consumable' | 'weapons' | 'armor' | 'misc';
  name: string;
  desc: string;
  price?: number;
  use?: (player: Player) => any;
}

export const useItem = (clientId: string, itemId: number) => {};

// TODO: pass manager for transaction
export const addItem = async (clientId: string, itemId: number) => {
  const player = await getPlayer(clientId);
  if (!player) {
    return { added: false, error: 'Player not found!' };
  }
  const item = await getManager().getRepository(Inventory).findOne({
    player,
    itemId,
  });
  if (!item) {
    await getManager()
      .getRepository(Inventory)
      .create({
        player,
        itemId: itemId,
        amount: 1,
      })
      .save();
  } else {
    item.amount += 1;
    await item.save();
  }
  return { added: true };
};
