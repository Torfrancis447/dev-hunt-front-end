import React, {useState, useEffect, useContext} from "react"
import { Grid, Box, CircularProgress} from "@mui/material"
import JobCard from "./JobCard"
import ViewJobModal from "./ViewJobModal"
import SearchBar from "./SearchBar"

import { UserContext } from "../context/user";

const Joblist = () => {
const {user, setUser}= useContext(UserContext)
const[currentJob, setCurrentJob]=useState({})
const[jobs, setJobs]=useState([])
const[isLoading, setIsLoading] = useState(false) 
const [filteredJobs, setFilteredJobs]=useState([])



function handleClose(){
    setCurrentJob({})
    
}



  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3000/jobs')
        .then(resp => resp.json())
        .then((jobData) => {
          setJobs(jobData)
          setFilteredJobs(jobData)
          setIsLoading(false)

        })
  }, [])


    return (
        <Grid container justifyContent="center">
        <Grid item xs={10}>
        <SearchBar jobs={jobs} setFilteredJobs={setFilteredJobs}/>
        
        <ViewJobModal job={currentJob} handleClose={handleClose} />
            { isLoading ? <Box display="flex" justifyContent="center"><CircularProgress/></Box> :
            
            filteredJobs.map((job) => (<JobCard open={() => setCurrentJob(job)} key={job.id} 
            location={job.location} position={job.title} 
             company={job.company.name} postedAt={job.created_at} skills={job.skills} job={job} />))
            }
            
        </Grid>
      </Grid>
       
    )
}
export default Joblist