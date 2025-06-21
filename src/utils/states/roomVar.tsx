import { atom } from "recoil";
// room id created by create room is stored here
export const Room = atom({
    default: "",
    key: "RoomVar"
})