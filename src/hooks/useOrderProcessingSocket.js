import { useRef, useState } from "react"
import io from "socket.io-client";

export default function useCreateOrderProcessingSocket(order) {

    function createOrder() {
        order.current = io.connect("http://localhost:80", {
            withCredentials: true
        })
    }

    function disconnectOrder() {
        order.current.disconnect(true)
        order.current = null
    }

    return [createOrder, disconnectOrder]
}