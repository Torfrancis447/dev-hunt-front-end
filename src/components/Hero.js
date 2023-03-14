
import { Grid, Box, Typography, Button } from "@mui/material"
import React from "react"
import image from "../Assets/stock-image-2.jpg"
import { Link } from "react-router-dom";

function Hero(){
    return (
      <Grid
        container
        spacing={8}
        columns={16}
        maxWidth="100"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Box sx={{ mt: 4, ml: 5 }}>
            <Typography
              variant="h4"
              sx={{ color: "#2B3467", fontWeight: "bold" }}
            >
              Find the right job for you
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#687284", mt: 2 }}>
              Browse thousands of developer job postings from top companies around the
              world.
            </Typography>
            
            <Box sx={{ mt: 4 , borderRadius: '5px'}}>
              <Button variant="contained" component={Link} to="/login" color="primary" size="large">
                Search Jobs
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
        <Box sx={{ mt: 4 }} p={2}>
                        <img src={image} alt="job board" style={{ maxWidth: "100%" }} />
                    </Box>
          {/* <img src={image} /> */}
        </Grid>
      </Grid>
    );
};
export default Hero

// function Hero(){
//   return (
//       <Box sx={{ backgroundColor: "#F6F8FB" }}>
//           <Grid container spacing={2} alignItems="center" justifyContent="space-between" maxWidth="lg">
//               <Grid item xs={12} sm={6}>
//                   <Box sx={{ mt: 4 }}>
//                       <Typography variant="h4" sx={{ color: "#2B3467", fontWeight: "bold" }}>
//                           Find the right job for you
//                       </Typography>
//                       <Typography variant="subtitle1" sx={{ color: "#687284", mt: 2 }}>
//                           Browse thousands of job postings from top companies around the world.
//                       </Typography>
//                       <Box sx={{ mt: 4 }}>
//                           <Button variant="contained" color="primary" size="large">
//                               Search Jobs
//                           </Button>
//                       </Box>
//                   </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                   <Box sx={{ mt: 4 }}>
//                       <img src={image} alt="job board" style={{ maxWidth: "100%" }} />
//                   </Box>
//               </Grid>
//           </Grid>
//       </Box>
//   );
// };

// export default Hero;