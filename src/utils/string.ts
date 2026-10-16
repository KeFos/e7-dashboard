export const capitalize = (input: string, firstOnly: boolean = false): string => {
  if (firstOnly)
    return input.at(0)?.toUpperCase() + input.slice(1)

  return input.split(' ').map((str) => str.at(0)?.toUpperCase() + str.slice(1)).join(' ')
}
