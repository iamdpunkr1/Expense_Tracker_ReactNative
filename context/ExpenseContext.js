import { createContext, useState, useContext} from "react";

export const ExpenseContext = createContext()
export const useExpenseContext = ()=> useContext(ExpenseContext)

export const ExpenseContextProvider = ({children}) =>{

 const [selfExpenses, setSelfExpenses]= useState([]);                                        
 const [groups, setGroups]= useState([]);
 const [toggle, setToggle]=useState(false);


 const value ={selfExpenses, setSelfExpenses,groups, setGroups, toggle, setToggle}
 return (
    <ExpenseContext.Provider value={value}>
     {children}
    </ExpenseContext.Provider>
 )
 
}