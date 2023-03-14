import React from "react";
import {useState, useContext, useEffect} from "react";

const UserContext = React.createContext()

function UserProvider({children}){

    const [user, setUser] = useState(null)
    // /${localStorage.userId}
    useEffect(() => {
      if(localStorage.userId)
        fetch(`http://localhost:3000/me/${localStorage.userId}`).then((r) => {
          if (r.ok) {
            r.json().then((userInfo) => {
              setUser(userInfo)
              localStorage.removeItem("job")
              
            });
          } 
        });
      }, [])

    


    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider };