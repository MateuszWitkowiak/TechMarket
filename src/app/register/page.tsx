"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()
  const validationSchema = Yup.object({
    name: Yup.string().required("Imie jest wymagane!"),
    surname: Yup.string().required("Nazwisko jest wymagane!"),
    email: Yup.string().email('Nieprawidłowy adres email').required("Adres e-mail jest wymagany!"),
    password: Yup.string().min(6, "Hasło musi mieć minimalnie 6 znaków").required("Hasło jest wymagane!")
  })

  const handleSubmit = async (values: {name: string, surname: string, email: string, password: string}) => {
    setLoading(true)
    try {
      const query = await axios.post("http://localhost:3001/api/register", values)
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false
      });
      router.push("/login")
    } catch(err){
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const formik = useFormik({
    initialValues: {name: "", surname: "", email: "", password: ""},
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });
  return (
    <>
      <ToastContainer />
      <Navbar />
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-[50%]">
        <input type="text" name="name" placeholder="name" onChange={formik.handleChange} value={formik.values.name} />
        <input type="text" name="surname" placeholder="surname" onChange={formik.handleChange} value={formik.values.surname} />
        <input type="email" name="email" placeholder="email" onChange={formik.handleChange} value={formik.values.email} />
        <input type="password" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password} />
        <button type="submit">Zarejestruj</button>
      </form>
    </>
  )
}
