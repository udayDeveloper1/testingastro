import React, { useCallback } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/login.css'
// import logo from '../../assets/img/'
import { login } from '../../services/api/api.services'
import { setLoading } from '../../storemain/slice/MasterSlice'
import { setLoginDataDetails } from '../../storemain/slice/UserSlice'
// import { loginRedirection, TOAST_SUCCESS } from '../../utils/CommonFunction'
import { Codes } from '../../utils/CommonVariable'
import { UpdatedPaths } from '../../routers/Paths'

const loginRedirection = React.lazy(() => import('../../utils/CommonFunction').then(module => ({ default: module.loginRedirection })));
const TOAST_SUCCESS = React.lazy(() => import('../../utils/CommonFunction').then(module => ({ default: module.TOAST_SUCCESS })));

// Memoizing the Logo component to avoid unnecessary re-renders
// const MemoizedLogo = React.memo(() => (
//   <img src={logo} alt='logo' className='loginLogo mx-auto block mb-5' />
// ))

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const PATHS = UpdatedPaths()

  // Memoize the onFinish function to avoid re-creation on each render
  const onFinish = useCallback(async (values) => {
    dispatch(setLoading({ is_loading: true, loding_type: 'login' }))

    const request = {
      country_code: values?.country_code || '+91',
      mobile_number: values?.mobile_number || '7435878036',
      device_type: 'A',
      device_token: 'ctiZ-iIcsUJL07f7iScKqX:APA91bEfUQhSXSehFMdkwTVrmJ-TA8c4xWaCRWzl2lwuYSTsgGqbM7lXCOInsyF6aBcbJgDdH9Bgv3cR0_JaNdjucew24ykOxCeHYhFnclZSqmoXL5O-B14'
    }

    try {
      const response = await login(request)
      if (response?.code === Codes?.SUCCESS) {
        loginRedirection(response?.data)
        dispatch(setLoginDataDetails(response?.data))
        navigate(PATHS?.HOMEPAGE)
        TOAST_SUCCESS(response?.message)
      }
    } finally {
      // Ensuring the loading is set back to false after API call
      dispatch(setLoading({ is_loading: false, loding_type: '' }))
    }
  }, [dispatch, navigate])

  return (
    <div className='fixed top-0 left-0 w-full h-full bg loginBg flex items-center justify-center'>
      <div>
        {/* Use memoized logo */}
        {/* <MemoizedLogo /> */}

        <Form
          name='basic'
          className='loginForm'
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input placeholder='userName' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password placeholder='password' />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmltype='submit' className='login_btn'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default React.memo(Login)
