import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ReactTimeAgo from 'react-time-ago'

const JobCard = ({open, location, position, skills, company, compensation, postedAt, job}) => {
const number = job.compensation
const formattedNumber = number?.toLocaleString("en-US")

    return (
      <Box p={2} sx={{boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)"}}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="subitle1"> {job.title}</Typography>
            <Typography variant="subtitle2"> {company}</Typography>
          </Grid>
          <Grid item container xs justifyContent="space-between">
            {skills ? skills.map((skill, id) => (
              <Grid key={id} item>
                {skill.name}
              </Grid>
            )): <></>}
          </Grid>
          <Grid item container direction="column" alignItems="flex-end" xs >
          <Grid item>
            <Typography variant="caption"> <ReactTimeAgo date={new Date(job.created_at)} locale="en-US" timeStyle="round"/>| ${formattedNumber}|ZipCode:{job.location} </Typography>
            </Grid>
          </Grid>
          <Grid item >            
            <Button onClick={open}  variant="outlined">View</Button>
          </Grid>
        </Grid>
      </Box>
    );
};

export default JobCard