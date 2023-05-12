export enum GenerateType {
  Error = 'error',
  Info = 'info',
}

export function generateHTMLInfo(type: GenerateType, info?: Error | string) {
  const spanStyle = `
  background-color: ${type === GenerateType.Error ? '#c0300f' : 'dodgerblue'};
  padding-inline-start: 0.6rem;
  padding-inline-end: 0.6rem;
  display: inline-block
`

  return `<span style="${spanStyle}">${type}</span> ${(type === GenerateType.Error && info instanceof Error) ? `${info.name}: ${info.message}` : (info ?? 'System returned a undefined response').toString()}`
}
