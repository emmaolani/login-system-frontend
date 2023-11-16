import { useState } from "react"
import { useConnectServer } from "./useConnectToServer"

export default function useAuthuser() {
    const [response, setresponse] = useState({status: null, message: false})

    async function useVerifyUser(user = null, method, successStatus, url) {
        try {
            const result = await useConnectServer(user, url, successStatus, method)  
            return setresponse({status: successStatus, message: result})
        } catch (error) {
            setresponse({status: error.status, message: error.statusText})  
            throw error
        }
    }

    return [response, useVerifyUser]
}