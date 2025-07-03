/* eslint-disable @typescript-eslint/no-explicit-any */
export const maybe =
  <Func extends (...args: any[]) => any>(
    func: Func,
  ): ((...args: Partial<Parameters<Func>>) => ReturnType<Func> | undefined) =>
  (...args) => {
    if (args.some((arg) => typeof arg === "undefined")) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return func(...args)
  }
