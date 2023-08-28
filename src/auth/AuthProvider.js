import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => "",
    saveUser: () => {},
    getRefreshToken: () => {},
    saveSessionInfo: () => {},
    getUserInfo: () => {},
    getUser: () => {},
    signOut: () => {},
})

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("")
    const [user, setUser] = useState("")
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth()
    }, []);

    const getNewAccessToken = async(refreshToken) => {
        try {
            const response = await fetch('https://api-nodejs-u1qp.onrender.com/v1/loginRoutes/refreshToken',{
               method: "POST",
               headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
               }, 
            });

            if(response.ok){
                const data = await response.json();

                if(data.error){
                    
                    throw new Error(data.error)
                }
                return data.data;
            }else{
                const data = await response.json();
                console.log(data.message)
                
            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const getUserInfo = async(accessToken, idUser) => {
        try {
            const response = await fetch(`https://api-nodejs-u1qp.onrender.com/v1/usuRoutes/${idUser}`,{
               method: "GET",
               headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
               }, 
            });

            if(response.ok){
                const data = await response.json();

                if(data.error){
                    throw new Error(data.error)
                }
                return data.data;
            }else{
                //throw new Error(response.statusText)
                const data = await response.json()
                //setErrorResponse(data.message)
                console.log(data.data.message)
            }

        } catch (error) {
            console.log("Hola " + error);
            return null;
        }
    }

    const checkAuth = async() => {
        if(accessToken){
            //usuario autenticado
            console.log("User logeado")
            const token = getRefreshToken();
            const newToken = await getNewAccessToken(token)//consigue un nuevo accessToken
            const userInfo = await getUserInfo(newToken.token, newToken.id)
            console.log(userInfo)
            setUser(userInfo);
            
            setAccessToken(newToken.token);
            setIsAuthenticated(true);
            setIsLoading(false);
        }else{
            //usuario no autenticado
            console.log("User No logeado")
            const token = getRefreshToken();//get refreshToken in localstorage
            if(token){
                const newToken = await getNewAccessToken(token)//get new token from API

                if(newToken){
                    const userInfo = await getUserInfo(newToken.token, newToken.id)//get data of user from API
                    if(userInfo){
                        saveSessionInfo(userInfo, newToken.token, token)//save new user session instance
                        setIsLoading(false);
                    }
                }else{
                    //Si el refreshToken enviado está caducado o no es válido envia error
                    console.log('Debe volver a iniciar sesión.')
                    setIsLoading(false);
                }
            }else{
                setIsLoading(false);
            }
        }
    }

    //Guarda unicio de sesión o sesión recuperada con el refreshToken
    const saveSessionInfo = (userInfo, accessToken, refreshToken) => {
        setAccessToken(accessToken);
        localStorage.setItem('token', refreshToken);//save refreshToken in localStorage
        setIsAuthenticated(true);//permite iniciar sesión
        setUser(userInfo)
    }

    const getAccessToken = () => {
        return accessToken;
    }

    //Permite buscar el refreshToken, si existe lo retorna de lo contrario null
    const getRefreshToken = () => {

        const tokenData = localStorage.getItem("token");

        if(tokenData){
            return tokenData;
        }

        return null;
    }

    const saveUser = (userInfo) => {
        saveSessionInfo(
            userInfo.data, 
            userInfo.data.token, 
            userInfo.data.refreshToken,
            )
    }

    const getUser = () => {//envia los datos del usuario al actualizar la page y creado el new token para la sesión
        return user;
    }

    const signOut = () => {//cierre de sesión
        setIsAuthenticated(false)
        setAccessToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    //Se asocia AuthContext a AuthProvider
    return(
        <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveSessionInfo, saveUser, getRefreshToken, getUserInfo, getUser, signOut}}>
            {isloading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}

//Esto permite que se exporte el hook AuthContext
export const useAuth = () => useContext(AuthContext);