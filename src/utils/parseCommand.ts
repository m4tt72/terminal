export const getArguments = (inputCmd: string) =>
  inputCmd
    .split(' ')
    .splice(2)
    .filter((arg) => Boolean(arg));
