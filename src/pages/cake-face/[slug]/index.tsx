import { Suspense, startTransition } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutMain from '@/layouts/Main'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import { cakeFaceApi, settingApi } from '@/utils/api'
import { SETTING_ITEM_TYPE } from '@/utils/api/setting'
import { commonHelpers } from '@/utils/helpers'
import { CAKE_FACE_ITEM_TYPE } from '@/utils/api/cakeFace'
import CFDetail from '@/layouts/CFDetail'

type ISeoProps = {
  title: string
  description: string
  openGraph?: any
}

export const getServerSideProps = (async ({ locale, params }) => {
  const slug = params!.slug as string
  const id = slug.split('-').reverse()[0]

  let seoData: ISeoProps = {
    title: 'Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn - timbanh.com',
    description:
      'Bạn đang tìm kiếm chiếc bánh hoàn hảo cho dịp đặc biệt? Tìm Bánh là điểm đến lý tưởng để biến mọi ý tưởng thành hiện thực!\nThế giới bánh đa dạng:\nMẫu bánh đẹp lung linh: Từ bánh kem sinh nhật, bánh cưới, đến bánh kỷ niệm, Tìm Bánh sở hữu bộ sưu tập mẫu mã đa dạng, cập nhật xu hướng mới nhất, đảm bảo bạn tìm được chiếc bánh phù hợp với mọi chủ đề và phong cách.\nĐủ loại bánh hấp dẫn: Bánh kem tươi, bánh fondant, bánh mousse, cupcake, macaron,... Tìm Bánh đáp ứng mọi sở thích và khẩu vị của bạn.\nTự thiết kế bánh độc đáo: Công cụ trực quan cho phép bạn thỏa sức sáng tạo, từ chọn hình dáng, màu sắc, đến thêm chữ viết, hình ảnh theo ý muốn.\nTìm Bánh - Nơi ý tưởng thăng hoa, vị ngon lan tỏa.\nĐặt bánh ngay hôm nay và trải nghiệm sự khác biệt!',
    openGraph: {
      url: 'https://www.timbanh.com',
      title: 'Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn - timbanh.com',
      description:
        'Bạn đang tìm kiếm chiếc bánh hoàn hảo cho dịp đặc biệt? Tìm Bánh là điểm đến lý tưởng để biến mọi ý tưởng thành hiện thực!\nThế giới bánh đa dạng:\nMẫu bánh đẹp lung linh: Từ bánh kem sinh nhật, bánh cưới, đến bánh kỷ niệm, Tìm Bánh sở hữu bộ sưu tập mẫu mã đa dạng, cập nhật xu hướng mới nhất, đảm bảo bạn tìm được chiếc bánh phù hợp với mọi chủ đề và phong cách.\nĐủ loại bánh hấp dẫn: Bánh kem tươi, bánh fondant, bánh mousse, cupcake, macaron,... Tìm Bánh đáp ứng mọi sở thích và khẩu vị của bạn.\nTự thiết kế bánh độc đáo: Công cụ trực quan cho phép bạn thỏa sức sáng tạo, từ chọn hình dáng, màu sắc, đến thêm chữ viết, hình ảnh theo ý muốn.\nTìm Bánh - Nơi ý tưởng thăng hoa, vị ngon lan tỏa.\nĐặt bánh ngay hôm nay và trải nghiệm sự khác biệt!',
      siteName: 'Tìm bánh',
    },
  }
  try {
    if (commonHelpers.isNumber(id)) {
      const res = await cakeFaceApi.getById(id)
      if (res.status === 200) {
        let item = res.data.params ? (res.data.params as CAKE_FACE_ITEM_TYPE) : null
        seoData = item
          ? {
              title: `${item.name ? `${item.name} -` : ''} Tìm bánh - timbanh.com`,
              description: item.detail,
              openGraph: {
                url: encodeURI(item.thumbnail),
                title: `${item.name ? `${item.name} -` : ''} Tìm bánh - timbanh.com`,
                description: item.detail,
                images: [
                  {
                    url: encodeURI(item.thumbnail),
                    alt: item.name,
                  },
                  { url: encodeURI(item.thumbnail) },
                ],
                siteNitem: `${item.name ? `${item.name} -` : ''} Tìm bánh - timbanh.com`,
              },
            }
          : seoData
      }
    }
  } catch (error) {
    console.log(error)
  }
  return {
    props: { seoData, ...(await serverSideTranslations(locale || '')) },
  }
}) satisfies GetServerSideProps<{
  seoData: ISeoProps
}>

const ViewCakeFace = dynamic(() => import('@/views/CakeFace'), {
  suspense: true,
  ssr: false,
})

const CakeFace: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <Suspense fallback="...">
      <NextSeo title={props.seoData.title} description={props.seoData.description} />
      <ViewCakeFace />
    </Suspense>
  )
}

CakeFace.getLayout = (page) => {
  return <CFDetail>{page}</CFDetail>
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || "")),
//     },
//   };
// };

export default CakeFace
