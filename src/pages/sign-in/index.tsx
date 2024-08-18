import { Suspense, startTransition } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutAuth from '@/layouts/Auth'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = (async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || '')) },
  }
}) satisfies GetServerSideProps<{}>

const ViewSignIn = dynamic(() => import('@/views/SignIn'), {
  suspense: true,
  ssr: true,
})

const SignIn: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <Suspense fallback="...">
      <ViewSignIn />
    </Suspense>
  )
}

SignIn.getLayout = (page) => {
  return <LayoutAuth>{page}</LayoutAuth>
}

export default SignIn
