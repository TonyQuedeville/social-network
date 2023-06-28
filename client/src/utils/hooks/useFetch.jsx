import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [dataUser, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return 
        
        async function fetchData() {
            //console.log("url:", url);
            setLoading(true)
            try{
                const response = await fetch(url)
                const dt = await response.json()
                console.log(dt)
                setData(dt)
            } catch(err) {
                console.log("error fetchUser !", err);
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { isLoading, dataUser, error }
}