import React, { useContext, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";

function MyApplicationCard({ application }) {
  // function getApplication(){
  //     fetch(`http://localhost:3000/`)
  //         .then(resp => resp.json())
  //         .then((jobData) => {
  //           console.log(jobData)
  //         })
  // }
  // useEffect(()=>(
  //     fetch('http://localhost:3000/my_applications')
  //     .then(resp => resp.json())
  //         .then((Data) => {
  //           setCompanies(companyData)
  //         })
  // ),[])

  return (
    <>
      <Box p={2} sx={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)"}}>
        <Grid container alignItems="center" >
          <Grid item xs>
            <Typography variant="subtitle1">{application.job_title}</Typography>
            {/* <Typography>Applicants: {application.application_count}</Typography> */}
          </Grid>
          <Grid item container direction="column" alignItems="flex-end" xs>
            <Grid item>
              <Typography variant="caption">
                {application.company_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{application.location}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {application.employment_type}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {application.compensation_type} {application.compensation}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyApplicationCard;
