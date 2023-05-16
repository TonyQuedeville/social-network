import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return 
        
        async function fetchData() {
            setLoading(true)
            try{
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            } catch(err) {
                //console.log("error fetchUser !", error);
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { isLoading, data, error }
}