import { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import Cookie from "js-cookie";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async (data) => {

        try {

            const response = await axios.post('/register', data);

            setUser(response.data);
            setIsAuth(true);

            return response.data;

        } catch (error) {

            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }

            setErrors([error.response.data.message]);
        }

    };

    const login = async (data) => {

        try {
            const response = await axios.post('/login', data);

            setUser(response.data);
            setIsAuth(true);

            return response.data;

        } catch (error) {

            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }

            setErrors([error.response.data.message]);
        }

    };

    const logout = async () => {
        await axios.post("/logout");
        setUser(null);
        setIsAuth(false);
    };


    useEffect(() => {

        setLoading(true)
    
        if (Cookie.get('jwt_token')) {

            axios.get('/profile')
                .then((response) => {
                    console.log(response.data)
                    setUser(response.data);
                    setIsAuth(true);
                    setLoading(false);
                })
                .catch((err) => { 
                    console.log(err)
                    setUser(null);
                    setIsAuth(false);
                    setLoading(false);
                })
        } else {
            setIsAuth(false);
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        const clean = setTimeout(() => {
            setErrors(null);
        }, 3000);

        return () => clearTimeout(clean);
    }, [errors])

    return (
        <AuthContext.Provider
            value={{ user, isAuth, errors, signup, login, logout, loading, setLoading, setIsAuth }}
        >
            {children}
        </AuthContext.Provider>
    )

}

