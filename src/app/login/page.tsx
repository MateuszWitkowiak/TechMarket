"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export default function Register() {
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()
  const loadingBar = useRef<LoadingBarRef>(null);
  const validationSchema = Yup.object({
    email: Yup.string().email('Nieprawidłowy adres email').required("Adres e-mail jest wymagany!"),
    password: Yup.string().min(6, "Hasło musi mieć minimalnie 6 znaków").required("Hasło jest wymagane!")
  })

  const handleSubmit = async (values: {email: string, password: string}) => {
    setLoading(true)
    loadingBar.current?.continuousStart();
    try {
      const response = await axios.post("http://localhost:3001/api/login", values)
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false
      });
      router.push("/")
    } catch(err){
      console.log(err)
    } finally {
      setLoading(false)
      loadingBar.current?.complete();
    }
  }
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });
  return (
    <>
      <ToastContainer />
      <LoadingBar color="#f11946" ref={loadingBar} />
      <Navbar />
      <form onSubmit={formik.handleSubmit}>
        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        <button type="submit">Zaloguj</button>
      </form>
    </>
  )
}
