import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { Modal, Slider } from 'antd'
import { getCroppedImg } from '../../utils/CommonFunction'
import { useDispatch } from 'react-redux'
import { setCropIamge } from '../../storemain/slice/MasterSlice'

export default function ProfileImageCropper({ file, onCropDone, onCancel,setCropFile }) {
  const [imageSrc, setImageSrc] = useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
const dispatch = useDispatch();
  // Load image only once when file is available
useEffect(() => {
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => setImageSrc(reader.result)
  reader.readAsDataURL(file)

  return () => {
    reader.abort()
  }
}, [file])
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

const handleDone = async () => {
  if (!croppedAreaPixels || !imageSrc) {
    return
  }

  try {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)

    const croppedFile = new File([croppedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    })
    croppedFile.uid = file.uid // If needed

    dispatch(setCropIamge(croppedFile))
    onCropDone(croppedFile)
    setCropFile(null) // Close modal
  } catch (err) {
    console.error("Crop failed:", err)
  }
}


  return (
   <Modal open={!!file} onCancel={onCancel} onOk={handleDone} title="Crop Image" className='Cropper_sec'>
  <div className="relative w-full h-[300px] bg-black ">
    {imageSrc && (
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    )}
  </div>
  <div className="my-4">
    <Slider min={1} max={3} step={0.1} value={zoom} onChange={setZoom} />
  </div>
</Modal>
  )
}
