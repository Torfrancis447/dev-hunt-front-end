import React from "react";
import {useState, useContext, useEffect} from "react";

const JobContext = React.createContext()

function JobProvider({children}){

    const [currentJob, setCurrentJob] = useState({})

    
    


    return <JobContext.Provider value={{currentJob, setCurrentJob}}>{children}</JobContext.Provider>
}

export {JobContext, JobProvider };