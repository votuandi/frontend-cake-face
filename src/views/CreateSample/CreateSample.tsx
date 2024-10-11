/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
// import Slider from 'react-slick'
import useStyles from './CreateSample.style'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getSampleBackgroundList, getSamplePatternList } from '@/store/sample/sample.action'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { HexColorPicker } from 'react-colorful'
import { FONTS, TEXT_SIZE } from '@/utils/constants/common.constant'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import PhotoIcon from '@mui/icons-material/Photo'
import { toPng } from 'html-to-image'
import { createGlobalStyle } from 'styled-components'
import QRCode from 'react-qr-code'
import { getSettings } from '@/store/setting/setting.action'
import Head from 'next/head'
import { sampleApi } from '@/utils/api'
import { commonConfig } from '@/utils/configs'

export default function CreateSample() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()
  const dispatch = useDispatch()
  const workspaceRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const {
    sampleBackgroundList,
    sampleBackgroundListError,
    sampleBackgroundListLoading,
    sampleBackgroundTotalPage,
    sampleBackgroundTotalPageActive,
    samplePatternList,
    samplePatternListError,
    samplePatternListLoading,
    samplePatternTotalPage,
    samplePatternTotalPageActive,
  } = useSelector((state: RootState) => state.sample)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [tabIndex, setTabIndex] = useState<number>(0)
  const [selectedSB, setSelectedSB] = useState<number>(-1)
  const [textColor, setTextColor] = useState('#DA0015')
  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false)
  const [zoomSB, setZoomSB] = useState<number>(10)
  const [textX, setTextX] = useState<number>(0)
  const [textY, setTextY] = useState<number>(0)
  const [text, setText] = useState<string>('')
  const [textSize, setTextSize] = useState<number>(14)
  const [selectedFont, setSelectedFont] = useState<string>('Open Sans')
  const [isItalic, setIsItalic] = useState<boolean>(false)
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isUnderline, setIsUnderline] = useState<boolean>(false)
  const [sampleUrl, setSampleUrl] = useState<string>('https://www.timbanh.com/sample/create')

  const [selectedSP_1, setSelectedSP_1] = useState<number>(-1)
  const [zoomSP_1, setZoomSP_1] = useState<number>(10)
  const [spX_1, setSpX_1] = useState<number>(0)
  const [spY_1, setSpY_1] = useState<number>(0)
  const [selectedSP_2, setSelectedSP_2] = useState<number>(-1)
  const [zoomSP_2, setZoomSP_2] = useState<number>(10)
  const [spX_2, setSpX_2] = useState<number>(0)
  const [spY_2, setSpY_2] = useState<number>(0)
  const [selectedSP_3, setSelectedSP_3] = useState<number>(-1)
  const [zoomSP_3, setZoomSP_3] = useState<number>(10)
  const [spX_3, setSpX_3] = useState<number>(0)
  const [spY_3, setSpY_3] = useState<number>(0)
  const [selectedSP_4, setSelectedSP_4] = useState<number>(-1)
  const [zoomSP_4, setZoomSP_4] = useState<number>(10)
  const [spX_4, setSpX_4] = useState<number>(0)
  const [spY_4, setSpY_4] = useState<number>(0)
  const [spTabIndex, setSpTabIndex] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')
  // const [imageUrl, setImageUrl] = useState<string | null>(null)

  const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&family=Baloo+Bhaijaan+2:wght@400..800&family=Cormorant:ital,wght@0,300..700;1,300..700&family=Dancing+Script:wght@400..700&family=Danfo&family=Gluten:wght@100..900&family=Grandstander:ital,wght@0,100..900;1,100..900&family=Grenze+Gotisch:wght@100..900&family=Jaro:opsz@6..72&family=Lemonada:wght@300..700&family=Merienda:wght@300..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Sansita+Swashed:wght@300..900&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Tektur:wght@400..900&display=swap');
`

  const handleChangeFont = (event: SelectChangeEvent<string>) => {
    setSelectedFont(event.target.value as string)
  }

  const handleChangeSize = (event: SelectChangeEvent<number>) => {
    setTextSize(event.target.value as number)
  }

  const handleChangeSP = (index: number) => {
    if (spTabIndex === 0) setSelectedSP_1((x) => (x === index ? -1 : index))
    if (spTabIndex === 1) setSelectedSP_2((x) => (x === index ? -1 : index))
    if (spTabIndex === 2) setSelectedSP_3((x) => (x === index ? -1 : index))
    if (spTabIndex === 3) setSelectedSP_4((x) => (x === index ? -1 : index))
  }

  const handleChangeZoom = (event: Event, newValue: number | number[]) => {
    if (tabIndex === 0) {
      setZoomSB(newValue as number)
    } else if (tabIndex === 1) {
      if (spTabIndex === 0) setZoomSP_1(newValue as number)
      if (spTabIndex === 1) setZoomSP_2(newValue as number)
      if (spTabIndex === 2) setZoomSP_3(newValue as number)
      if (spTabIndex === 3) setZoomSP_4(newValue as number)
    }
  }

  const handleChangeTextX = (event: Event, newValue: number | number[]) => {
    setTextX(newValue as number)
  }
  const handleChangeTextY = (event: Event, newValue: number | number[]) => {
    setTextY(newValue as number)
  }

  const handleChangeSpX = (event: Event, newValue: number | number[]) => {
    if (spTabIndex === 0) setSpX_1(newValue as number)
    if (spTabIndex === 1) setSpX_2(newValue as number)
    if (spTabIndex === 2) setSpX_3(newValue as number)
    if (spTabIndex === 3) setSpX_4(newValue as number)
  }

  const handleChangeSpY = (event: Event, newValue: number | number[]) => {
    if (spTabIndex === 0) setSpY_1(newValue as number)
    if (spTabIndex === 1) setSpY_2(newValue as number)
    if (spTabIndex === 2) setSpY_3(newValue as number)
    if (spTabIndex === 3) setSpY_4(newValue as number)
  }

  let handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 2 && text.length === 0) {
      setText('Nhập chữ cho bánh')
    }
    setTabIndex(newValue)
  }

  let handleChangeSPTab = (event: React.SyntheticEvent, newValue: number) => {
    setSpTabIndex(newValue)
  }

  const handleCaptureClick = async () => {
    if (workspaceRef.current === null) return

    try {
      setIsLoading(true)
      let htmlContent = `<html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&family=Baloo+Bhaijaan+2:wght@400..800&family=Cormorant:ital,wght@0,300..700;1,300..700&family=Dancing+Script:wght@400..700&family=Danfo&family=Gluten:wght@100..900&family=Grandstander:ital,wght@0,100..900;1,100..900&family=Grenze+Gotisch:wght@100..900&family=Jaro:opsz@6..72&family=Lemonada:wght@300..700&family=Merienda:wght@300..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Sansita+Swashed:wght@300..900&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Tektur:wght@400..900&display=swap" rel="stylesheet">
      </head>
      <body>
        <div
          style="
            height: ${workspaceRef.current.offsetHeight * 2}px;
            aspect-ratio: 1;
            padding: 30px;
            background-color: #fff;
            position: relative;
          "
        >
          <div
            style="
              width: ${workspaceRef.current.offsetHeight * 2}px;
              height: ${workspaceRef.current.offsetHeight * 2}px;
              position: absolute;
              z-index: 10;
              background-image: url(${encodeURI(sampleBackgroundList[selectedSB]?.image)});
              background-position: center;
              background-size: ${zoomSB * 10}% ${zoomSB * 10}%;
              background-repeat: no-repeat;
              top: 0;
              left: 0;
            "
          ></div>
          <div
            style="
              width: ${workspaceRef.current.offsetHeight * 2}px;
              height: ${workspaceRef.current.offsetHeight * 2}px;
              position: absolute;
              z-index: 11;
              background-image: url(${encodeURI(samplePatternList[selectedSP_1]?.image)});
              background-position: ${50 + spX_1}% ${50 + spY_1}%;
              background-size: ${zoomSP_1 * 10}% ${zoomSP_1 * 10}%;
              background-repeat: no-repeat;
              top: 0;
              left: 0;
            "
          ></div>
          <div
            style="
              width: ${workspaceRef.current.offsetHeight * 2}px;
              height: ${workspaceRef.current.offsetHeight * 2}px;
              position: absolute;
              z-index: 11;
              background-image: url(${encodeURI(samplePatternList[selectedSP_2]?.image)});
              background-position: ${50 + spX_2}% ${50 + spY_2}%;
              background-size: ${zoomSP_2 * 10}% ${zoomSP_2 * 10}%;
              background-repeat: no-repeat;
              top: 0;
              left: 0;
            "
          ></div>

          <div
            style="
              width: ${workspaceRef.current.offsetHeight * 2}px;
              height: ${workspaceRef.current.offsetHeight * 2}px;
              position: absolute;
              z-index: 11;
              background-image: url(${encodeURI(samplePatternList[selectedSP_3]?.image)});
              background-position: ${50 + spX_3}% ${50 + spY_3}%;
              background-size: ${zoomSP_3 * 10}% ${zoomSP_3 * 10}%;
              background-repeat: no-repeat;
              top: 0;
              left: 0;
            "
          ></div>

          <div
            style="
              width: ${workspaceRef.current.offsetHeight * 2}px;
              height: ${workspaceRef.current.offsetHeight * 2}px;
              position: absolute;
              z-index: 11;
              background-image: url(${encodeURI(samplePatternList[selectedSP_4]?.image)});
              background-position: ${50 + spX_4}% ${50 + spY_4}%;
              background-size: ${zoomSP_4 * 10}% ${zoomSP_4 * 10}%;
              background-repeat: no-repeat;
              top: 0;
              left: 0;
            "
          ></div>

          <span
            style="
              width: ${workspaceRef.current.offsetHeight * 2}px;
              color: ${textColor};
              font-family: ${selectedFont};
              font-size: ${textSize * 2}px;
              font-weight: ${isBold ? 700 : 400};
              font-style: ${isItalic ? 'italic' : 'normal'};
              text-decoration: ${isUnderline ? 'underline' : 'none'};
              position: absolute;
              top: ${textX * 2};
              left: ${textY * 2};
              text-align: center;
              white-space: pre-line;
              z-index: 12;
            "
          >${text}</span>
        </div>
      </body>
    </html>`

      console.log(htmlContent)

      const response = await fetch(`${commonConfig.API_HOST}/sample-pattern/download-sample/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: htmlContent, size: workspaceRef.current.offsetHeight * 2 }),
      })

      // const response = await fetch(`/api/generate-image`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ htmlContent }),
      // })

      console.log(response)

      if (response.status) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        console.log(url)

        // setImageUrl(url)
        const link = document.createElement('a')
        link.href = url
        link.download = 'maubanh-timbanh.com.png'
        link.click()
        setIsLoading(false)
      } else {
        alert('Tải ảnh thất bại')
        console.error('Failed to generate image')
        setIsLoading(false)
      }
    } catch (error) {
      alert('Tải ảnh thất bại')
      console.error('Error capturing content:', error)
      setIsLoading(false)
    }
  }

  const handleDownloadQRClick = async () => {
    if (qrRef.current === null) return

    try {
      setIsLoading(true)
      const spToText = `${samplePatternList[selectedSP_1]?.id ? samplePatternList[selectedSP_1].id : 'null'}_${zoomSP_1}_${spX_1}_${spY_1}_${
        samplePatternList[selectedSP_2]?.id ? samplePatternList[selectedSP_2].id : 'null'
      }_${zoomSP_2}_${spX_2}_${spY_2}_${samplePatternList[selectedSP_3]?.id ? samplePatternList[selectedSP_3].id : 'null'}_${zoomSP_3}_${spX_3}_${spY_3}_${
        samplePatternList[selectedSP_4]?.id ? samplePatternList[selectedSP_4].id : 'null'
      }_${zoomSP_4}_${spX_4}_${spY_4}`

      setSampleUrl(
        `https://www.timbanh.com/sample/create?sample=${sampleBackgroundList[selectedSB].id}_${zoomSB}_${spToText}&text=${encodeURIComponent(text)}&style=${textSize}_${
          isItalic ? '1' : '0'
        }_${isBold ? '1' : '0'}_${isUnderline ? '1' : '0'}_${textColor.replace('#', '')}_${textX}_${textY}`
      )

      const dataUrl = await toPng(qrRef.current)
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'qr-maubanh-timbanh.com.png'
      link.click()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error capturing content:', error)
    }
  }

  useEffect(() => {
    if (sampleBackgroundList.length > 0 && samplePatternList.length > 0)
      try {
        let query = router.query
        console.log(query)
        if (router.query.sample) {
          let sampleProps = (router.query.sample as string).split('_')
          if (sampleProps.length !== 18) {
            alert('Mẫu bánh không còn tồn tại. Error: 1')
            return
          }

          let indexSB = sampleBackgroundList.map((x) => x.id.toString()).indexOf(sampleProps[0])
          if (indexSB === -1) {
            alert('Mẫu bánh không còn tồn tại. Error: 2')
            return
          } else {
            setSelectedSB(indexSB)
            setZoomSB(Number(sampleProps[1]))
          }

          if (sampleProps[2] === 'null') {
            setSelectedSP_1(-1)
            setZoomSP_1(Number(sampleProps[3]))
            setSpX_1(Number(sampleProps[4]))
            setSpY_1(Number(sampleProps[5]))
          } else {
            let indexSP_1 = samplePatternList.map((x) => x.id.toString()).indexOf(sampleProps[2])
            if (indexSP_1 === -1) {
              alert('Mẫu bánh không còn tồn tại. Error: 3')
              return
            } else {
              setSelectedSP_1(indexSP_1)
              setZoomSP_1(Number(sampleProps[3]))
              setSpX_1(Number(sampleProps[4]))
              setSpY_1(Number(sampleProps[5]))
            }
          }

          if (sampleProps[6] === 'null') {
            setSelectedSP_2(-1)
            setZoomSP_2(Number(sampleProps[7]))
            setSpX_2(Number(sampleProps[8]))
            setSpY_2(Number(sampleProps[9]))
          } else {
            let indexSP_2 = samplePatternList.map((x) => x.id.toString()).indexOf(sampleProps[6])
            if (indexSP_2 === -1) {
              alert('Mẫu bánh không còn tồn tại. Error: 4')
              return
            } else {
              setSelectedSP_2(indexSP_2)
              setZoomSP_2(Number(sampleProps[7]))
              setSpX_2(Number(sampleProps[8]))
              setSpY_2(Number(sampleProps[9]))
            }
          }

          if (sampleProps[10] === 'null') {
            setSelectedSP_3(-1)
            setZoomSP_3(Number(sampleProps[11]))
            setSpX_3(Number(sampleProps[12]))
            setSpY_3(Number(sampleProps[13]))
          } else {
            let indexSP_3 = samplePatternList.map((x) => x.id.toString()).indexOf(sampleProps[10])
            if (indexSP_3 === -1) {
              alert('Mẫu bánh không còn tồn tại. Error: 5')
              return
            } else {
              setSelectedSP_3(indexSP_3)
              setZoomSP_3(Number(sampleProps[11]))
              setSpX_3(Number(sampleProps[12]))
              setSpY_3(Number(sampleProps[13]))
            }
          }

          if (sampleProps[14] === 'null') {
            setSelectedSP_4(-1)
            setZoomSP_4(Number(sampleProps[15]))
            setSpX_4(Number(sampleProps[16]))
            setSpY_4(Number(sampleProps[17]))
          } else {
            let indexSP_4 = samplePatternList.map((x) => x.id.toString()).indexOf(sampleProps[14])
            if (indexSP_4 === -1) {
              alert('Mẫu bánh không còn tồn tại. Error: 6')
              return
            } else {
              setSelectedSP_4(indexSP_4)
              setZoomSP_4(Number(sampleProps[15]))
              setSpX_4(Number(sampleProps[16]))
              setSpY_4(Number(sampleProps[17]))
            }
          }
        }

        if (router.query.text) {
          setText(router.query.text as string)
        }

        if (router.query.style) {
          let textStyleProps = (router.query.style as string).split('_')

          if (textStyleProps.length !== 7) {
            alert('Mẫu bánh không còn tồn tại.')
            return
          }

          setTextSize(Number(textStyleProps[0]))
          setIsItalic(textStyleProps[1] === '1')
          setIsBold(textStyleProps[2] === '1')
          setIsUnderline(textStyleProps[3] === '1')
          setTextColor(`#${textStyleProps[4]}`)
          setTextX(Number(textStyleProps[5]))
          setTextY(Number(textStyleProps[6]))
        }
      } catch (error) {
        alert('Mẫu bánh không còn tồn tại.')
        return
      }
  }, [sampleBackgroundList, samplePatternList])

  useEffect(() => {
    if (!isMounted()) {
      dispatch(
        getSampleBackgroundList({
          params: {},
        })
      )
      dispatch(
        getSamplePatternList({
          params: {},
        })
      )
      dispatch(getSettings())
    }
  }, [])

  useEffect(() => {
    settings.forEach((x) => {
      if (x.name === 'seo_content') setSeoContent(x.value)
      if (x.name === 'ico_logo') setIcon(x.value)
      if (x.name === 'full_logo') setLogo(x.value)
    })
  }, [settings])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <>
      <Head>
        <title>Tạo mẫu bánh - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com</title>
        <link rel="icon" href={icon} />
        <meta name="description" content={seoContent} />
        <meta property="og:title" content="Tạo mẫu bánh - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com" />
        <meta property="og:description" content={seoContent} />
        <meta property="og:image" content={logo} />
      </Head>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '100px 0 16px 0',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            textAlign: 'center',
            alignItems: 'center',
            margin: '0 auto',
            fontFamily: 'Open Sans',
          }}
        >
          <div
            ref={workspaceRef}
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#6abcb6',
            }}
          >
            <div
              style={{
                margin: '0 auto',
                height: '100%',
                maxHeight: '400px',
                aspectRatio: 1,
                backgroundColor: '#fff',
                position: 'relative',
              }}
            >
              <GlobalStyle />
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 10,
                  backgroundImage: `url("${encodeURI(sampleBackgroundList[selectedSB]?.image)}")`,
                  backgroundPosition: 'center',
                  backgroundSize: `${zoomSB * 10}% ${zoomSB * 10}%`,
                  backgroundRepeat: 'no-repeat',
                  top: 0,
                  left: 0,
                }}
              ></div>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 11,
                  backgroundImage: `url(${encodeURI(samplePatternList[selectedSP_1]?.image)})`,
                  backgroundPosition: `${50 + spX_1}% ${50 + spY_1}%`,
                  backgroundSize: `${zoomSP_1 * 10}% ${zoomSP_1 * 10}%`,
                  backgroundRepeat: 'no-repeat',
                  top: 0,
                  left: 0,
                }}
              ></div>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 11,
                  backgroundImage: `url(${encodeURI(samplePatternList[selectedSP_2]?.image)})`,
                  backgroundPosition: `${50 + spX_2}% ${50 + spY_2}%`,
                  backgroundSize: `${zoomSP_2 * 10}% ${zoomSP_2 * 10}%`,
                  backgroundRepeat: 'no-repeat',
                  top: 0,
                  left: 0,
                }}
              ></div>

              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 11,
                  backgroundImage: `url(${encodeURI(samplePatternList[selectedSP_3]?.image)})`,
                  backgroundPosition: `${50 + spX_3}% ${50 + spY_3}%`,
                  backgroundSize: `${zoomSP_3 * 10}% ${zoomSP_3 * 10}%`,
                  backgroundRepeat: 'no-repeat',
                  top: 0,
                  left: 0,
                }}
              ></div>

              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 11,
                  backgroundImage: `url(${encodeURI(samplePatternList[selectedSP_4]?.image)})`,
                  backgroundPosition: `${50 + spX_4}% ${50 + spY_4}%`,
                  backgroundSize: `${zoomSP_4 * 10}% ${zoomSP_4 * 10}%`,
                  backgroundRepeat: 'no-repeat',
                  top: 0,
                  left: 0,
                }}
              ></div>

              <span
                style={{
                  width: '100%',
                  color: textColor,
                  fontFamily: selectedFont,
                  fontSize: textSize,
                  fontWeight: isBold ? 700 : 400,
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: isUnderline ? 'underline' : 'none',
                  textAlign: 'center',
                  position: 'absolute',
                  top: textX,
                  left: textY,
                  whiteSpace: 'pre-line',
                  zIndex: 12,
                }}
              >
                {text}
              </span>
            </div>
          </div>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '1px -3px 10px -4px rgba(0,0,0,0.6)',
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                width: '100%',
                padding: '0 20px',
              }}
            >
              <Tabs scrollButtons allowScrollButtonsMobile value={tabIndex} onChange={handleChangeTab} aria-label="basic tabs example">
                <Tab label="Mặt bánh" />
                <Tab label="Họa tiết" />
                <Tab label="Chữ viết" />
                <Tab label="Tải xuống" />
              </Tabs>
            </Box>
            {tabIndex === 0 && (
              <Grid container sx={{ backgroundColor: '#fff' }}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center ',
                      padding: '10px 20px',
                      gap: '16px',
                    }}
                  >
                    <Typography sx={{ width: '80px' }}>Zoom</Typography>
                    <Slider value={zoomSB} min={0} max={50} onChange={handleChangeZoom} />
                    <Typography sx={{ width: '80px' }}>x {zoomSB / 10}</Typography>
                  </Box>
                </Grid>
                {sampleBackgroundList.map((item, index) => (
                  <Grid
                    item
                    xs={4}
                    key={index}
                    sx={{
                      backgroundImage: `url(${encodeURI(item.image)})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      aspectRatio: 1,
                    }}
                    onClick={() => setSelectedSB((x) => (x === index ? -1 : index))}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: selectedSB === index ? '#0596a63b' : 'transparent',
                        position: 'relative',
                      }}
                    >
                      {selectedSB === index && <CheckCircleIcon sx={{ width: '20px', position: 'absolute', bottom: '10px', right: '10px', color: '#6DD101' }} />}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            {tabIndex === 1 && (
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <Tabs
                  orientation="vertical"
                  scrollButtons
                  allowScrollButtonsMobile
                  value={spTabIndex}
                  onChange={handleChangeSPTab}
                  aria-label="basic tabs example"
                  sx={{
                    backgroundColor: '#a6ecf49e',
                  }}
                >
                  <Tab label="1" sx={{ backgroundColor: spTabIndex === 0 ? '#0596a668' : 'transparent', color: spTabIndex === 0 ? '##fff' : '#000' }} />
                  <Tab label="2" sx={{ backgroundColor: spTabIndex === 1 ? '#0596A668' : 'transparent', color: spTabIndex === 1 ? '##fff' : '#000' }} />
                  <Tab label="3" sx={{ backgroundColor: spTabIndex === 2 ? '#0596A668' : 'transparent', color: spTabIndex === 2 ? '##fff' : '#000' }} />
                  <Tab label="4" sx={{ backgroundColor: spTabIndex === 3 ? '#0596A668' : 'transparent', color: spTabIndex === 3 ? '##fff' : '#000' }} />
                </Tabs>
                <Grid container sx={{ backgroundColor: '#fff' }}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center ',
                        padding: '10px 20px',
                        gap: '16px',
                      }}
                    >
                      <Typography sx={{ width: '80px' }}>Zoom</Typography>
                      <Slider
                        value={spTabIndex === 0 ? zoomSP_1 : spTabIndex === 1 ? zoomSP_2 : spTabIndex === 2 ? zoomSP_3 : zoomSP_4}
                        min={0}
                        max={50}
                        onChange={handleChangeZoom}
                      />
                      <Typography sx={{ width: '80px' }}>
                        x {spTabIndex === 0 ? zoomSP_1 / 10 : spTabIndex === 1 ? zoomSP_2 / 10 : spTabIndex === 2 ? zoomSP_3 / 10 : zoomSP_4 / 10}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center ',
                        padding: '10px 20px',
                        gap: '10px',
                      }}
                    >
                      <Slider value={spTabIndex === 0 ? spX_1 : spTabIndex === 1 ? spX_2 : spTabIndex === 2 ? spX_3 : spX_4} min={-50} max={50} onChange={handleChangeSpX} />
                      <Typography sx={{ width: '125px' }}>Tọa độ X: {spTabIndex === 0 ? spX_1 : spTabIndex === 1 ? spX_2 : spTabIndex === 2 ? spX_3 : spX_4}</Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center ',
                        padding: '10px 20px',
                        gap: '10px',
                      }}
                    >
                      <Slider value={spTabIndex === 0 ? spY_1 : spTabIndex === 1 ? spY_2 : spTabIndex === 2 ? spY_3 : spY_4} min={-50} max={50} onChange={handleChangeSpY} />
                      <Typography sx={{ width: '125px' }}>Tọa độ Y: {spTabIndex === 0 ? spY_1 : spTabIndex === 1 ? spY_2 : spTabIndex === 2 ? spY_3 : spY_4}</Typography>
                    </Box>
                  </Grid>
                  {samplePatternList.map((item, index) => (
                    <Grid
                      item
                      xs={4}
                      key={index}
                      sx={{
                        backgroundImage: `url(${encodeURI(item.image)})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        aspectRatio: 1,
                      }}
                      onClick={() => handleChangeSP(index)}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          background: selectedSP_1 === index ? '#0596a63b' : 'transparent',
                          position: 'relative',
                        }}
                      >
                        {spTabIndex === 0 && selectedSP_1 === index && (
                          <CheckCircleIcon sx={{ width: '20px', position: 'absolute', bottom: '10px', right: '10px', color: '#6DD101' }} />
                        )}
                        {spTabIndex === 1 && selectedSP_2 === index && (
                          <CheckCircleIcon sx={{ width: '20px', position: 'absolute', bottom: '10px', right: '10px', color: '#6DD101' }} />
                        )}
                        {spTabIndex === 2 && selectedSP_3 === index && (
                          <CheckCircleIcon sx={{ width: '20px', position: 'absolute', bottom: '10px', right: '10px', color: '#6DD101' }} />
                        )}
                        {spTabIndex === 3 && selectedSP_4 === index && (
                          <CheckCircleIcon sx={{ width: '20px', position: 'absolute', bottom: '10px', right: '10px', color: '#6DD101' }} />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabIndex === 2 && (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ width: '100%', margin: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                    sx={{ '& fieldset': { borderColor: '#0596A6' } }}
                  ></TextField>
                  <Grid container>
                    <Grid item xs={6} sx={{ pr: '8px' }}>
                      <FormControl fullWidth sx={{ fontFamily: selectedFont, '& fieldset': { borderColor: '#0596A6' } }}>
                        <InputLabel id="font-select-label">Font</InputLabel>
                        <Select labelId="font-select-label" label="Font" value={selectedFont} onChange={handleChangeFont} variant="outlined">
                          {FONTS.map((font, fIndex) => (
                            <MenuItem
                              key={fIndex}
                              value={font}
                              sx={{
                                fontFamily: font,
                              }}
                            >
                              {font}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth sx={{ fontFamily: selectedFont, '& fieldset': { borderColor: '#0596A6' } }}>
                        <InputLabel id="size-select-label">Size</InputLabel>
                        <Select labelId="size-select-label" label="Size" value={textSize} onChange={handleChangeSize} variant="outlined">
                          {TEXT_SIZE.map((size, sIndex) => (
                            <MenuItem key={sIndex} value={size}>
                              {size}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        '& button': { padding: 0, minWidth: '24px', fontSize: '16px', height: '24px' },
                      }}
                    >
                      <Button onClick={() => setIsItalic((x) => !x)} sx={{ fontStyle: 'italic' }} variant={isItalic ? 'contained' : 'text'}>
                        I
                      </Button>
                      <Button sx={{ fontWeight: 700 }} onClick={() => setIsBold((x) => !x)} variant={isBold ? 'contained' : 'text'}>
                        B
                      </Button>
                      <Button sx={{ textDecoration: 'underline' }} onClick={() => setIsUnderline((x) => !x)} variant={isUnderline ? 'contained' : 'text'}>
                        U
                      </Button>
                      <Button onClick={() => setIsShowColorPicker((x) => !x)} variant={isShowColorPicker ? 'contained' : 'text'}>
                        <FormatColorTextIcon sx={{ width: '20px' }} />
                      </Button>
                    </Grid>
                    {isShowColorPicker && (
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '8px' }}>
                        <HexColorPicker color={textColor} onChange={setTextColor} />
                      </Grid>
                    )}
                  </Grid>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center ',
                      gap: '10px',
                    }}
                  >
                    <Slider value={textX} min={0} max={workspaceRef?.current?.offsetHeight} onChange={handleChangeTextX} />
                    <Typography sx={{ width: '125px' }}>Tọa độ X: {textX}</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center ',
                      gap: '10px',
                    }}
                  >
                    <Slider
                      value={textY}
                      min={workspaceRef?.current?.offsetHeight ? -workspaceRef?.current?.offsetHeight : 0}
                      max={workspaceRef?.current?.offsetHeight}
                      onChange={handleChangeTextY}
                    />
                    <Typography sx={{ width: '125px' }}>Tọa độ Y: {textY}</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {tabIndex === 3 && (
              <Box
                sx={{
                  width: '100%',
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  gap: '32px',

                  '& button': {
                    padding: '16px 20px',
                    margin: '0 auto',
                    width: '160px',
                    borderRadius: '4px',
                  },

                  '& svg': {
                    width: '32px',
                  },
                }}
              >
                <Button variant="contained" onClick={handleCaptureClick}>
                  <PhotoIcon />
                </Button>
                <Button variant="contained" onClick={handleDownloadQRClick}>
                  <QrCode2Icon />
                </Button>
                {/* <Button variant="contained">
                {' '}
                <PhotoIcon /> + <QrCode2Icon />
              </Button> */}
                {/* <>
                  <Box
                    ref={qrRef}
                    sx={{
                      width: '100%',
                      maxWidth: '800px',
                      aspectRatio: 1,
                      padding: '12px',
                      backgroundColor: '#fff',
                    }}
                  >
                    <img src={imageUrl ? imageUrl : ''} alt="Review" />
                  </Box>
                </> */}
                <>
                  <Box
                    ref={qrRef}
                    sx={{
                      width: '100%',
                      maxWidth: '800px',
                      aspectRatio: 1,
                      padding: '12px',
                      backgroundColor: '#fff',
                    }}
                  >
                    <QRCode size={256} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={sampleUrl} viewBox={`0 0 256 256`} />
                  </Box>
                </>
              </Box>
            )}
          </Box>
        </Box>
        {isLoading && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#00000080',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 91,
            }}
          >
            <CircularProgress sx={{ width: '80px', height: '80px', color: '#26787c' }} />
          </Box>
        )}
      </Box>
    </>
  )
}
