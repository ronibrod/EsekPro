import { atom } from 'jotai';

export const userAtom = atom({
  username: '',
  isLoggedIn: false,
});
