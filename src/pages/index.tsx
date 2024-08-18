import { Suspense, startTransition } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutMain from '@/layouts/Main'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import { settingApi } from '@/utils/api'
import { SETTING_ITEM_TYPE } from '@/utils/api/setting'

type ISeoProps = {
  title: string
  description: string
  openGraph?: any
}

export const getServerSideProps = (async ({ locale }) => {
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
    const res = await settingApi.getSettings()
    if (res.status === 200) {
      let seoContent = (res.data.params as SETTING_ITEM_TYPE[]).findLast((x) => x.name === 'seo_content')?.value
      let logo = (res.data.params as SETTING_ITEM_TYPE[]).findLast((x) => x.name === 'full_logo')?.value
      seoData = seoContent
        ? {
            title: 'Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn - timbanh.com',
            description: seoContent,
            openGraph: {
              url: 'https://www.timbanh.com',
              title: 'Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn - timbanh.com',
              description:
                'Bạn đang tìm kiếm chiếc bánh hoàn hảo cho dịp đặc biệt? Tìm Bánh là điểm đến lý tưởng để biến mọi ý tưởng thành hiện thực!\nThế giới bánh đa dạng:\nMẫu bánh đẹp lung linh: Từ bánh kem sinh nhật, bánh cưới, đến bánh kỷ niệm, Tìm Bánh sở hữu bộ sưu tập mẫu mã đa dạng, cập nhật xu hướng mới nhất, đảm bảo bạn tìm được chiếc bánh phù hợp với mọi chủ đề và phong cách.\nĐủ loại bánh hấp dẫn: Bánh kem tươi, bánh fondant, bánh mousse, cupcake, macaron,... Tìm Bánh đáp ứng mọi sở thích và khẩu vị của bạn.\nTự thiết kế bánh độc đáo: Công cụ trực quan cho phép bạn thỏa sức sáng tạo, từ chọn hình dáng, màu sắc, đến thêm chữ viết, hình ảnh theo ý muốn.\nTìm Bánh - Nơi ý tưởng thăng hoa, vị ngon lan tỏa.\nĐặt bánh ngay hôm nay và trải nghiệm sự khác biệt!',
              images: [
                {
                  url: logo,
                  alt: 'Tìm bánh',
                },
                { url: logo },
              ],
              siteName: 'Tìm bánh',
            },
          }
        : seoData
      console.log('res', res)

      console.log('seoData', seoData)
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

const ViewHome = dynamic(() => import('@/views/Home'), {
  suspense: true,
  ssr: true,
})

const Home: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <Suspense fallback="...">
      <NextSeo title={props.seoData.title} description={props.seoData.description} />
      <ViewHome />
    </Suspense>
  )
}

Home.getLayout = (page) => {
  return <LayoutMain>{page}</LayoutMain>
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || "")),
//     },
//   };
// };

export default Home
