import React, {useState} from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
;



  const SearchBar = ({ setFilteredJobs, jobs }) => {
    
    const [jobSearch, setJobSearch] = useState({
      type: 'full-time',
      location: 'remote',
    });
    
    let copyJobs = [...jobs]
      let newJobs = copyJobs.filter(
        (job) =>
          (job.employment_type == jobSearch.type) & (job.location_type == jobSearch.location

      ))
    const handleSearch = () => {
      
      if(newJobs <= 0) {
        setFilteredJobs(copyJobs)
      } else {
        setFilteredJobs(newJobs)
      }    
      // console.log(newJobs)
    };
  
    const handleClear = () => {
      setJobSearch({ type: 'full-time', location: 'remote' });
      setFilteredJobs(jobs);
    };
  
    return (
      <Box
        alignItems="center"
        p={2}
        mt={-5}
        mb={2}
        sx={{
          backgroundColor: '#FFFF',
          display: 'flex',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
          '& > *': {
            flex: 1,
            height: '45px',
            margin: '8px',
          },
        }}
      >
        <Select
          onChange={(e) => setJobSearch({ ...jobSearch, type: e.target.value })}
          value={jobSearch.type}
          disableUnderline
          variant="filled"
          defaultValue="full-time"
        >
          <MenuItem value="full-time">Full Time</MenuItem>
          <MenuItem value="part-time">Part Time</MenuItem>
          <MenuItem value="contract">Contract</MenuItem>
        </Select>
        <Select
        
          onChange={(e) => setJobSearch({ ...jobSearch, location: e.target.value })}
          value={jobSearch.location}
          disableUnderline
          variant="filled"
          defaultValue="remote"
        >
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
          <MenuItem value="on-site">On-Site</MenuItem>
        </Select>
        <Button variant="contained" color="primary" disableElevation onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="secondary" disableElevation onClick={handleClear}>
          Clear
        </Button>
      </Box>
    );
  };
  
  export default SearchBar;