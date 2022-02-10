import { Command } from './Command';
import { Daily } from './commands/Daily';
import { Hello } from './commands/Hello';
import { Profile } from './commands/Profile';

export const Commands: Command[] = [Hello, Profile, Daily];
