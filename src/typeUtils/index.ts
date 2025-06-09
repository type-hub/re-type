export type SafeOmit<T, K extends keyof T> = Omit<T, K>
export type SafePick<T, K extends keyof T> = Pick<T, K>
