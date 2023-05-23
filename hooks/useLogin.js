import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useLogin =()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password, navigation) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://10.0.2.2:4000/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
              // save the user to local storage
            AsyncStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload:json})

             // update loading state
             setIsLoading(false)
             navigation.replace("DrawerNavigator")
        }
    }

    return {login, isLoading, error}
}