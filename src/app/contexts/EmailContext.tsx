import React, { Children, ReactNode } from 'react'
import { createContext, useState } from "react"

const EmailContext = createContext<any>(null)
interface EmailProviderProps {
    children: ReactNode
}
function EmailProvider({children}: EmailProviderProps) {
    const [ email, setEmail ] = useState("")
    return (
    <EmailContext.Provider value={{email, setEmail}}>
        {children}
    </EmailContext.Provider>
  )
}

export default EmailContext