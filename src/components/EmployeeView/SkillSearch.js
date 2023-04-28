import React, { useState } from 'react'
import {TextField, Autocomplete} from "@mui/material";

const SkillSearch = ({setSkillOptions}) => {
    const [skills, setSkills] = useState([]);
    // const options = skills?.map((option, index) => ({ id: index, name: option }));

        const handleSkillSearch = (event) => {
            const skillName = event.target.value;
            const skill = { name: skillName }            
            fetch('http://localhost:3000/get_skills', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(skill)
              })
              .then(response => response.json())
              .then(data => setSkills(data))
              .catch(error => console.error(error))
          };
          const handleSelectedSkills = (event, value) => {
            console.log(value);
          }
   

  return (
    <>
        <Autocomplete
        multiple
        id="free-solo-demo"
       
        onChange={handleSelectedSkills}
        options={skills}
        
        getOptionLabel={(skill) => skill.name}
        renderInput={(params) => <TextField {...params} label="Skills" onChange={handleSkillSearch} />}
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