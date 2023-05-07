import axios from 'axios'
import type { ProjectsOfUser } from '../interfaces/project'
import config from '../../config.json'

interface Quote {
  _id: string
  content: string
  author: string
  authorSlug: string
  length: number
  tags: string[]
}

export async function getProjects() {
  const { data } = await axios.get<ProjectsOfUser[]>(`https://api.github.com/users/${config.social.github}/repos`)

  return data
}

export async function getBio() {
  const { data } = await axios.get<string>(config.bioUrl)

  return data
}

export async function getWeather(city: string) {
  const { data } = await axios.get<string>(`https://wttr.in/${city}?ATm`)

  return data
}

export async function getQuote() {
  const { data } = await axios.get<Quote>('https://api.quotable.io/random')

  return {
    quote: `“${data.content}” — ${data.author}`,
  }
}
