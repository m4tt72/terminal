import { useMatomo } from '@m4tt72/matomo-tracker-react'
import Head from 'next/head'
import React from 'react'
import { History } from '../components/history'
import { Input } from '../components/input'
import { useShell } from '../utils/shellProvider'
import { useTheme } from '../utils/themeProvider'
import config from '../../config.json'

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const { trackPageView } = useMatomo()
  const { history } = useShell()
  const { theme } = useTheme()

  const containerRef = React.useRef(null)

  React.useEffect(() => {
    trackPageView({})
  }, [])

  React.useEffect(() => {
    if (inputRef.current)
      inputRef.current.focus()
  }, [history])

  return (
    <>
      <Head>
        <title>M4TT72 | Home</title>
      </Head>

      <div
        className="overflow-hidden h-full rounded"
        style={{
          borderColor: theme.yellow,
          padding: config.border ? 16 : 8,
          borderWidth: config.border ? 2 : 0,
        }}
      >
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History history={history} />

          <Input inputRef={inputRef} containerRef={containerRef} />
        </div>
      </div>
    </>
  )
}

export default IndexPage
