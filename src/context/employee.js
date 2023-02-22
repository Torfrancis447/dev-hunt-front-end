import React from "react";
import {useState, useContext, useEffect} from "react";

const EmployeeContext = React.createContext()

function EmployeeProvider({children}){

    const [employee, setEmployee] = useState(null)

    useEffect(() => {
      if (localStorage.userId)
        fetch(`http://localhost:3000/me/${localStorage.userId}`).then((r) => {
          if (r.ok) {
            r.json().then((userInfo) => {
              setEmployee(userInfo)
              // localStorage.removeItem("employee")
            });
          } 
        });
      }, [])

    


    return <EmployeeContext.Provider value={{employee, setEmployee}}>{children}</UserContext.Provider>
}

export {EmployeeContext, EmployeeProvider };