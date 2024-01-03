import { useState } from "react"
import { useConnectToServer } from "./useConnectToServer"

export default function useRequest() {
    const [message, setMessage] = useState({loginStatus: null, message: false})

    async function MakeRequest(user = null, method, successStatus, url) {
        try {
            const result = await useConnectToServer(user, url, successStatus, method)  
            return setMessage({loginStatus: successStatus, message: result})
        } catch (error) {
            setMessage({loginStatus: error.status, message: error.statusText})  
        }
    }
    return [message, MakeRequest]
}
