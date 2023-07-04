// Peut être remplacé par React Query : https://tanstack.com/query/latest/docs/react/overview
import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [data, setData] = useState({})
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
                //console.log("dt:", dt)
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

    //console.log("data:", data)
    return { data, isLoading, error }
}
