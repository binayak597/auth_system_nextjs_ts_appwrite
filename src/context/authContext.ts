import { createContext, useContext } from "react"

interface AuthContextType {

  authStatus: boolean
  setAuthStatus: (status: boolean) => void 
}


//create the context

const AuthContext = createContext<AuthContextType | undefined>({

  authStatus: false,
  setAuthStatus: () => {}
})


const AuthContextProvider = AuthContext.Provider

const useAuth = (): AuthContextType | undefined => {

  const data = useContext<AuthContextType | undefined>(AuthContext)

  return data
}

export {useAuth}
export default AuthContextProvider