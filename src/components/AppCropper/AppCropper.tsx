import React, { useState, useCallback, useEffect } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import { Box, TextField, Typography } from '@mui/material'
import { LOGO_TYPE } from '@/utils/api/setting'

interface CropImageProps {
  inputImage: File
  type?: string
  onDone: (result: File) => void
  onCancel: () => void
}

const AppCropper = (props: CropImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImage, setCroppedImage] = useState<File | null>(null)
  const [aspect, setAspect] = useState<number>(1)

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', reject)
      image.src = url
    })

  const getCroppedImg = useCallback(async (): Promise<Blob | null> => {
    if (!imageSrc || !croppedAreaPixels) {
      console.error('No image source or cropped area defined')
      return null
    }

    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.error('Failed to get canvas context')
      return null
    }

    const { width, height } = croppedAreaPixels
    canvas.width = width
    canvas.height = height

    ctx.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, width, height)

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty')
          resolve(null)
          return
        }
        resolve(blob)
      }, 'image/png')
    })
  }, [imageSrc, croppedAreaPixels])

  const onCrop = async () => {
    const croppedImageBlob = await getCroppedImg()
    if (croppedImageBlob) {
      const croppedFile = new File([croppedImageBlob], 'croppedImage.jpeg', { type: 'image/png' })
      setCroppedImage(croppedFile)
      console.log('Cropped File:', croppedFile)
      props.onDone(croppedFile)
    }
  }

  const handleAspectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    setAspect(value)
  }

  useEffect(() => {
    const reader = new FileReader()
    reader.readAsDataURL(props.inputImage)
    reader.onload = async () => {
      const src = reader.result as string
      setImageSrc(src)
    }
  }, [props])

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        padding: '20px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999999999,
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: 5,
        fontFamily: 'Open Sans',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ fontSize: '24px', fontWeight: 600, mb: '10px', color: '#1a5456' }}>Crop Image</Typography>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper image={imageSrc ? imageSrc : ''} crop={crop} zoom={zoom} aspect={aspect} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
      </div>
      <div>
        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, value) => setZoom(value as number)} />
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {props.type !== LOGO_TYPE.SMALL ? (
          <TextField
            label="Tỉ lệ"
            type="number"
            value={aspect}
            onChange={handleAspectChange}
            // InputProps={{ step: 0.1 }}
            inputProps={{ min: 0.1, max: 10, step: 0.1 }}
            style={{ marginTop: 10 }}
          />
        ) : (
          <></>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            mt: '12px',
          }}
        >
          <Button variant="text" sx={{ borderRadius: '8px', padding: '8px 4px' }} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ borderRadius: '8px', padding: '8px 4px' }} onClick={onCrop}>
            OK
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AppCropper
