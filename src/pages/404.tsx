import { useRouter } from 'next/router'
import React from 'react'

function NotFoundPage() {
  const router = useRouter()

  React.useEffect(() => {
    router.replace('/').catch(console.error)
  })

  return null
}

export default NotFoundPage
