
import { Grid, Box, Typography } from "@mui/material"
import React from "react"
import image from "../Assets/stock-image-2.jpg"

function Hero(){
    return (
      <Grid container spacing={8} columns={16} maxWidth='100' alignItems="center">
        <Grid item xs={8}>
        <Box sx={{bgcolor: '#2B3467'}}>
            <Typography> Hero Page left </Typography>
        </Box>          
        </Grid>
        <Grid item xs={8}>
          <Typography> hero page right </Typography>
         <img src={image} />
        </Grid>
      </Grid>
    );
};
export default Hero