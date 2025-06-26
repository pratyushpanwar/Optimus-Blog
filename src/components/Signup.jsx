import React, {useState} from 'react'
import login from "../store/authSlice"
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import {useNavigate, Link} from "react-router-dom"
import {Button, Input, Logo} from './index.js'
import { useDispatch } from 'react-redux'

function Signup() {

    const [error,  setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit}  = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData) {
                const userData = await authService.getCurrUser()
                if(userData) dispatch(login(userData))
                    navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            
        </div>
    )
}

export default Signup

