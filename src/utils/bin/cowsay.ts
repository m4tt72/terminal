import * as cow from 'cowsay-browser'
import { getQuote } from '../../api'

interface Cow { say: ({ text }: { text: string }) => string }

export async function cowsay(args?: string[]): Promise<string> {
  let output = ''

  if (args.length < 1 || args[0] === '') {
    const quote = (await getQuote()).quote
    return (cow as Cow).say({ text: quote })
  }
  else {
    output = args.join(' ')
    return (cow as Cow).say({ text: output })
  }
}
