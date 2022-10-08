import React, { useCallback, useContext, useEffect, useState } from "react";
import { LinksList } from "../components/LinksList";

import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const LinksPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [links, setLinks] = useState([])
  


    const fetchLinks = useCallback(async () => {
        console.log("work")
        try {
            const fetched = await request(`http://localhost:5000/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
            console.log("fetched", fetched)
            console.log("links", links)
        } catch(e) {
            console.log(e)
        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
        // console.log("links2", links)
    }, [fetchLinks])

    if(loading) {
        return <Loader/>
    }
    return (
        <>
            { !loading && <LinksList links={links}/>}
        </>
    )
}
{/* <p>Sura</p> */}