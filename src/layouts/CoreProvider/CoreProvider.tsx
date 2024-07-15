import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import type { NextSeoProps } from 'next-seo'
import { useIsMounted } from 'usehooks-ts'

type CoreProviderProps = {
  headParams?: NextSeoProps
  children: React.ReactNode
}

const CoreProvider = (props: CoreProviderProps) => {
  const { headParams, children } = props

  const [loading, setLoading] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!isMounted()) return
    setLoading(true)
  }, [i18n.language])

  useEffect(() => {
    if (!isMounted()) return
    loading && setLoading(false)
  }, [loading])

  const isMounted = useIsMounted()

  return (
    <>
      <NextSeo {...headParams} />
      {!loading && children}
    </>
  )
}

export default CoreProvider
