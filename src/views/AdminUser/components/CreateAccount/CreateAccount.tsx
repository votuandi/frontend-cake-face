import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, Switch, FormControlLabel, MenuItem, Select, InputLabel, FormControl, IconButton, Avatar } from '@mui/material'
import { userApi } from '@/utils/api'
import { ROLE_TYPE } from '@/utils/constants/common.constant'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const validationSchema = yup.object({
  userName: yup.string().min(4, 'Username tối thiểu 4 ký tự').required('Vui lòng nhập Username'),
  password: yup
    .string()
    .min(8, 'Mật khẩu ít nhất 8 kí tự')
    .matches(/[a-z]/, 'Mật khẩu chứa cả chữ hoa, chữ thường, số và kí tự đặc biệt')
    .matches(/[A-Z]/, 'Mật khẩu chứa cả chữ hoa, chữ thường, số và kí tự đặc biệt')
    .matches(/\d/, 'Mật khẩu chứa cả chữ hoa, chữ thường, số và kí tự đặc biệt')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu chứa cả chữ hoa, chữ thường, số và kí tự đặc biệt')
    .required('Vui lòng nhập mật khẩu'),
  name: yup.string().min(2, 'Tên phải ít nhất 2 kí tự').required('Vui lòng nhập tên'),
  address: yup.string().min(3, 'Địa chỉ phải ít nhất 3 kí tự').required('Vui lòng nhập địa chỉ'),
  email: yup.string().email('Vui lòng nhập đúng định dạng e-mail').required('Vui lòng nhập e-mail'),
  phoneNumber: yup.string().min(10, 'Vui lòng nhập đúng SĐT').required('Vui lòng nhập SĐT'),
  note: yup.string(),
  role: yup.mixed().oneOf(['admin', 'client', 'user']).required('Vui lòng chọn quyền'),
  isActive: yup.boolean().required('Active status is required'),
  avatar: yup.mixed().required('Avatar is required'),
})

type IProp = {
  onFetchList: () => void
}

const CreateAccount: React.FC<IProp> = ({ onFetchList }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      name: '',
      address: '',
      email: '',
      phoneNumber: '',
      note: '',
      role: 'user',
      isActive: true,
      avatar: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let res = await userApi.create({
          params: {
            userName: values.userName,
            password: values.password,
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNumber: values.phoneNumber,
            note: values.note,
            isActive: values.isActive ? '1' : '0',
            role: values.role as ROLE_TYPE,
          },
        })
        if (res.status === 201) {
          alert('Tạo tài khoản thành công')
          onFetchList()
          formik.resetForm()
        } else {
          alert('Tạo tài khoản thất bại')
        }
      } catch (error) {
        alert('Tạo tài khoản thất bại')
      }
    },
  })

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0]
      formik.setFieldValue('avatar', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="userName"
        name="userName"
        label="Username"
        value={formik.values.userName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.userName && Boolean(formik.errors.userName)}
        helperText={formik.touched.userName && formik.errors.userName}
        margin="normal"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Tên"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />
      <TextField
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        label="Số điện thoại"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        margin="normal"
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
      <TextField
        fullWidth
        id="address"
        name="address"
        label="Địa chỉ"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        margin="normal"
      />
      <TextField fullWidth id="note" name="note" label="Note" value={formik.values.note} onChange={formik.handleChange} margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">Quyền (Loại tài khoản)</InputLabel>
        <Select labelId="role-label" id="role" name="role" value={formik.values.role} onChange={formik.handleChange} error={formik.touched.role && Boolean(formik.errors.role)}>
          <MenuItem sx={{ fontFamily: 'Open Sans' }} value="admin">
            Admin
          </MenuItem>
          <MenuItem sx={{ fontFamily: 'Open Sans' }} value="client">
            Client
          </MenuItem>
          <MenuItem sx={{ fontFamily: 'Open Sans' }} value="user">
            User
          </MenuItem>
        </Select>
      </FormControl>
      <input accept="image/*" style={{ display: 'none' }} id="avatar" name="avatar" type="file" onChange={handleAvatarChange} />
      <label htmlFor="avatar">
        Chọn avatar
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      {avatarPreview && <Avatar src={avatarPreview} alt="Avatar Preview" sx={{ width: 56, height: 56, mt: 2, mb: 2 }} />}
      {formik.touched.avatar && formik.errors.avatar && <div style={{ color: 'red' }}>{formik.errors.avatar}</div>}
      <FormControlLabel control={<Switch id="isActive" name="isActive" checked={formik.values.isActive} onChange={formik.handleChange} color="primary" />} label="Kích hoạt" />
      <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
        Tạo tài khoản
      </Button>
    </form>
  )
}

export default CreateAccount
