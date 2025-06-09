import { customAlphabet } from "nanoid"

const alphabet = `0123456789abcdefghijklmnopqrstuvwxyz`
export const uuid: () => string = customAlphabet(alphabet, 7)
