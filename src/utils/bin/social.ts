import config from '../../../config.json'

export async function instagram(args: string[]): Promise<string> {
  window.open(`https://www.instagram.com/${config.social.instagram}/`)

  return 'Opening instagram...'
}

export async function github(args: string[]): Promise<string> {
  window.open(`https://github.com/${config.social.github}/`)

  return 'Opening github...'
}

export async function linkedin(args: string[]): Promise<string> {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`)

  return 'Opening linkedin...'
}
