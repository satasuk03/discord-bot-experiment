import { Player } from 'entity/Player';
import { Item } from 'item/services';

export const smallPotion: Item = {
  itemId: 1,
  name: 'small potion',
  desc: 'recover 30 HP',
  type: 'consumable',
  price: 20,
  use: async (player: Player) => {
    player.hp = Math.min(player.hp + 30, player.maxHp);
    await player.save();
    return true;
  },
};
