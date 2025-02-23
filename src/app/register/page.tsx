import React from 'react'
import Navbar from '../components/Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Imie jest wymagane!"),
    surname: Yup.string().required("Nazwisko jest wymagane!"),
    email: Yup.string().email('Nieprawidłowy adres email').required("Adres e-mail jest wymagany!"),
    password: Yup.string().min(6, "Hasło musi mieć minimalnie 6 znaków").required("Hasło jest wymagane!")
  })

  const handleSubmit = async (values: {name: string, surname: string, email: string, password: string}) => {
    try {
      const response = axios.post("https://localhost:3001/api/register", values)
    } catch(err){
      console.log(err)
    }
  }
  const formik = useFormik({
    initialValues: {name: "", surname: "", email: "", password: ""},
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });
  return (
    <>
      <Navbar />
      <form onSubmit={formik.handleSubmit}>
        <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
        <input type="text" name="surname" onChange={formik.handleChange} value={formik.values.surname} />
        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        <button type="submit">Zarejestruj</button>
      </form>
    </>
  )
}
