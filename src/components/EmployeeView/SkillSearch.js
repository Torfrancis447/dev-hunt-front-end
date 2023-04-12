import React, { useState } from 'react'
import {TextField, Autocomplete} from "@mui/material";

const SkillSearch = () => {
    const [skills, setSkills] = useState([]);

    

        const handleSkillSearch = (event) => {
            const skillName = event.target.value;            
            fetch('http://localhost:3000/get_skills', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(skillName)
              })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error))
          };
        
   

  return (
    <>
        <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={skills.map((option) => option)}
        renderInput={(params) => <TextField {...params} label="skills" onChange={handleSkillSearch} />}
      />

        
    </>
  )
}

export default SkillSearch

{/* <TextField
        label="Search Skills"
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => console.log(e.target.value)}
      /> */}