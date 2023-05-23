import { useAuthContext } from "./useAuthContext"
// import { useExpenseContext } from "../context/ExpenseContext"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    // const {setSelfExpenses,setGroups}= useExpenseContext()

    const logout = () =>{
        // remove user from storage
        AsyncStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        // setSelfExpenses([])
        // setGroups([])
    }

    return {logout}
}