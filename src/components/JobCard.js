import React from "react";
import { Box, Grid, Typography, Button, Chip } from "@mui/material";
import ReactTimeAgo from "react-time-ago";

const JobCard = ({
  open,
  location,
  position,
  skills,
  company,
  compensation,
  postedAt,
  job,
}) => {
  const number = job.compensation;
  const formattedNumber = number?.toLocaleString("en-US");

  return (
    <Box p={2} m={2}sx={{
      boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
      transition: 'transform .2s',
      "&:hover": {
        transform: 'scale(1.05)',
        cursor: "pointer",
       
      }
    }}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subitle1"> {job.title}</Typography>
          <Typography variant="subtitle2"> {company}</Typography>
        </Grid>
        <Grid item container xs justifyContent="flex-start" spacing={2}>
          {skills ? (
            skills.map((skill, id) => (
              <Grid key={id} item>
                <Chip
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    },
                  }}
                  label={skill.name}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="flex-start"
          spacing={4}
          xs
        >
          <Grid item>
            <Typography variant="caption">
              <ReactTimeAgo
                date={new Date(job.created_at)}
                locale="en-US"
                timeStyle="round"
              />
            </Typography>
            <Typography variant="caption"> | ${formattedNumber} </Typography>
            <Typography variant="caption">
              {" "}
              | ZipCode:{job.location}{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid item paddingLeft={3}>
          <Button onClick={open} variant="outlined">
            View
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobCard;
