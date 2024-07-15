import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { commonHelpers } from '@/utils/helpers'
import { commonConfig } from '@/utils/configs'

import LayoutMain from '@/layouts/CFDetail'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { IGetSchoolCategoryDetailResponse } from '@/utils/api/school'
import { CAKE_FACE_ITEM_TYPE } from '@/utils/api/cakeFace'
import CoreProvider from '@/layouts/CoreProvider'
import { cakeFaceApi } from '@/utils/api'

type CakeFaceProps = {
  item: CAKE_FACE_ITEM_TYPE
}

const CakeFaceSlug = dynamic(() => import('@/views/CakeFace'), {
  suspense: true,
  ssr: false,
})

const CakeFace: NextPageWithLayout<CakeFaceProps> = () => {
  return (
    <Suspense fallback="...">
      <CakeFaceSlug />
    </Suspense>
  )
}

CakeFace.getLayout = (page, pageParams) => {
  return (
    <CoreProvider
      headParams={{
        title: pageParams?.item?.name,
        openGraph: {
          title: pageParams?.item?.name,
          images: [
            {
              url: pageParams?.item?.thumbnail,
              alt: pageParams?.item?.name,
            },
          ],
        },
      }}
    >
      <LayoutMain>{page}</LayoutMain>
    </CoreProvider>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   }
// }

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  const slug = params!.slug as string
  const id = slug.split('-').reverse()[0]

  if (commonHelpers.isNumber(id)) {
    try {
      const { data: response } = await cakeFaceApi.getById(id)

      return {
        props: {
          ...(await serverSideTranslations(locale || '')),
          service: response.params,
        },
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || '')),
    },
    notFound: true,
  }
}

export default CakeFace
