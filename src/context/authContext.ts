import { createContext, useContext } from "react";

interface AuthContextType {
  authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
}
export const AuthContext = createContext<AuthContextType>({
    authStatus: false,
    setAuthStatus: () => {},
});

export const AuthProvider = AuthContext.Provider;


const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
}

export {useAuth}
