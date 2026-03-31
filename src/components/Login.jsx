import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input} from './index'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/authSlice'
import authService from '../appwrite/auth'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login