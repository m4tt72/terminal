import { getBio } from '../../api'

export async function about(): Promise<string> {
  const bio = await getBio()

  return bio
}
