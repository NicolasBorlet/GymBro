import { atom } from "recoil";

export const UserDataAtoms = atom<any>({
  key: "user",
  default: null,
});
