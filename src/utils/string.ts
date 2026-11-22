export type TextSegment = {
  type: 'core' | 'positive' | 'negative' | 'neutral'
  text: string
}

export const capitalize = (input?: string, firstOnly: boolean = false): string => {
  if (!input) return ''

  const convertLetter = (word: string) => word[0].toUpperCase() + word.slice(1)

  return firstOnly ?
    convertLetter(input)
      :
    input
      .split(' ')
      .map((word) => word ? convertLetter(word) : '')
      .join(' ')
}

export const parseMarkedText = (input: string): TextSegment[] => {
  return input
    .split(/(\*\*.*?\*\*|--.*?--|\+\+.*?\+\+)/g)
    .filter(Boolean)
    .map((text) => {
      const type =
        text.startsWith('**') && text.endsWith('**') ? 'core' :
        text.startsWith('++') && text.endsWith('++') ? 'positive' :
        text.startsWith('--') && text.endsWith('--') ? 'negative' :
        'neutral'

      return {
        text: type === 'neutral' ? text : text.slice(2, -2),
        type
      }
    })
}
