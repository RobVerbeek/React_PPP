    import React, { useState } from 'react'
    import './LoginPage.css'
    import { useForm } from 'react-hook-form'
    import {z} from "zod"
    import {zodResolver} from '@hookform/resolvers/zod'
    import { login } from '../../services/userServices'

    const schema = z.object({
        email: z.string().email().min(3),
        password: z.string().min(8)
    })

    const LoginPage = () => {
        const [formError, setformError] = useState("")
        const {register, handleSubmit, formState: {errors}} = useForm({resolver : zodResolver(schema)})
        const onSubmit = async (formData) => {
            try {
                await login(formData)
                window.location = "/"
            } catch (err) {
                if(err.response && err.response.status === 400){
                    setformError(err.response.data.message)
                }
            }
        }
    return (
        <section className="align_center form_page">
            <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login Form</h2>
                <div className='form_inputs'>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id='email' type="email" className='form_text_input' placeholder='Enter your email address' {...register("email")}/>
                        {errors.email && <em className="form_error">{errors.email.message}</em>}
                    </div>                
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' className='form_text_input' placeholder='Enter your password' {...register("password")}/>
                        {errors.password && <em className="form_error">{errors.password.message}</em>}
                    </div>
                    {formError && <em className='form_error'>{formError}</em>}
                    <button type="submit" className='search_button form_submit'>Submit</button>
                </div>
            </form>
        </section>  
    )
    }

    export default LoginPage