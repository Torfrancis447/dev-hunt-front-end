import React, { useContext } from "react"
import { UserContext } from "../context/user"
import { Box } from "@mui/material"

export default function ApplicationList(){

const {user, setUser} = useContext(UserContext)

function getApplication(){ 
    fetch(`http://localhost:3000/${user.employee.id}`)
        .then(resp => resp.json())
        .then((jobData) => {
          console.log(jobData)          
        })
}
console.log(user)
    return (
        <>
        {/* {user && user.applications ? user.applications.map((application) => (
            <h1 key={application.id}>{application.applied_time}</h1>
        )) : null} */}<Box>
        <button onClick={getApplication}>Click me</button>
        </Box>
        </>
    )
};