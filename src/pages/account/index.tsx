import { Suspense, startTransition } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutMain from '@/layouts/Main'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = (async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || '')) },
  }
}) satisfies GetServerSideProps<{}>

const ViewAccount = dynamic(() => import('@/views/Account'), {
  suspense: true,
  ssr: true,
})

const Account: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <Suspense fallback="...">
      <ViewAccount />
    </Suspense>
  )
}

Account.getLayout = (page) => {
  return <LayoutMain>{page}</LayoutMain>
}

export default Account
