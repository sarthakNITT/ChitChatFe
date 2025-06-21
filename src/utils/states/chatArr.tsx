// utils/states/chatArr.ts
import { atom } from "recoil"

interface ChatMessage {
  message: string
  client: string
}

export const ChatArr = atom<ChatMessage[]>({
  key: "chatArr",
  default: [],
})
