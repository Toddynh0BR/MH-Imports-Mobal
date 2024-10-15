import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { api } from "../services/api"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState({});

    const showAlert = (title: string, message: string | undefined) => {
        Alert.alert(title, message, [{ text: "OK" }]);
    };

    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return showAlert("Atenção", "Informe o email/senha.");
        }

        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token, refreshToken } = response.data;

            if (!user.isadmin) return showAlert("Erro", "Acesso negado!");

            await AsyncStorage.setItem("@mhimports:user", JSON.stringify(user));
            await AsyncStorage.setItem("@mhimports:token", token);
            await AsyncStorage.setItem("@mhimports:refreshToken", refreshToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token });

        } catch (error) {
            if (error.response) {
                showAlert("Erro", error.response.data.message);
            } else {
                showAlert("Erro", "Não foi possível entrar.");
            }
        }
    };

    async function logout() {
        await AsyncStorage.removeItem("@mhimports:token");
        await AsyncStorage.removeItem("@mhimports:user");
        await AsyncStorage.removeItem("@mhimports:refreshToken");

        setData({});
    };

    async function refreshToken() {
        const storedRefreshToken = await AsyncStorage.getItem("@mhimports:refreshToken");
        if (!storedRefreshToken) {
            logout();
            return;
        }

        try {
            const response = await api.post("/sessions/refresh-token", { refreshToken: storedRefreshToken });
            const { token, refreshToken: newRefreshToken } = response.data;

            await AsyncStorage.setItem("@mhimports:token", token);
            await AsyncStorage.setItem("@mhimports:refreshToken", newRefreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData(prevState => ({
                ...prevState,
                token
            }));
        } catch (error) {
            logout();  
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("@mhimports:token");
            const user = await AsyncStorage.getItem("@mhimports:user");

            if (user && token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setData({
                    token,
                    user: JSON.parse(user)
                });
            }
        };

        fetchData();

        const interceptor = api.interceptors.response.use(
            response => response, 
            async error => {
                const originalRequest = error.config;

                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;  
                    
                    await refreshToken();  
                    originalRequest.headers['Authorization'] = `Bearer ${await AsyncStorage.getItem("@mhimports:token")}`;
                    return api(originalRequest); 
                }

                return Promise.reject(error); 
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
        };

    }, []);

    return (
        <AuthContext.Provider value={{ signIn, logout, user: data.user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
