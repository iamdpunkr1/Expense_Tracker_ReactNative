import { createContext, useState, useContext} from "react";

export const ExpenseContext = createContext()
export const useExpenseContext = ()=> useContext(ExpenseContext)

export const ExpenseContextProvider = ({children}) =>{
//  const [userName, setUserName]= useState('');
 const [selfExpenses, setSelfExpenses]= useState([]);                                        
 const [groups, setGroups]= useState([]);



 const value ={selfExpenses, setSelfExpenses,groups, setGroups}
 return (
    <ExpenseContext.Provider value={value}>
    {children}
    </ExpenseContext.Provider>
 )
 
}