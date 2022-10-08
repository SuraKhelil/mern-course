import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

// import React from "react";
export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const { request } = useHttp()

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request ('http://localhost:5000/api/link/generate', 
                'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                console.log(data)
                history.push(`/detail/${data.link._id}`)
            }catch(e) {
                console.log(e)
            }
        }
    }
    return (
        <div className="row">
            <h1> Create Page </h1>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        id="link"
                        name="link"
                        type="text" 
                        value={link}
                        placeholder="Enter link"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                </div>
            </div>
        </div>
    )
}