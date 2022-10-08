import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
        message(error)
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler  = event => {
        setForm({...form, [event.target.name]: event.target.value})
        // console.log('email', form.email)
    }

    const registerHandler = async () => {
        console.log({...form})
        try {
            const data = await request(
                'http://localhost:5000/api/auth/register', 'POST', {...form}
            )
            message(data.message)
        } catch(e) {

        }
    }

    const loginHandler = async () => {
        console.log({...form})
        try {
            const data = await request(
                'http://localhost:5000/api/auth/login', 'POST', {...form}
            )
            auth.login(data.token, data.userId)
            message(data.message)
        } catch(e) {

        }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Short Links</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Card Title</span>
                        
                        <div className="input-field">
                            <input 
                                id="email"
                                name="email"
                                type="text" 
                                value={form.email}
                                placeholder="Enter email"
                                onChange={changeHandler}
                                />
                         
                        </div>
                        <div className="input-field">
                            <input 
                                id="password"
                                name="password"
                                type="password" 
                                value={form.password}
                                placeholder="Enter password"
                                onChange={changeHandler}
                                />
                        
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight:10}}
                            onClick={loginHandler}
                            disabled={loading}
                            >Login</button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}