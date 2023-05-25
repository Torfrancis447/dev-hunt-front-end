import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import useDebounce from '../../hooks/useDebounce';

const SkillSearch = ({ setSkillOptions }) => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchValue = useDebounce(searchQuery, 1000);

  useEffect(() => {
    const fetchSkills = async () => {
      const skill = { name: debouncedSearchValue };
      try {
        const response = await fetch('http://localhost:3000/get_skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skill),
        });
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, [debouncedSearchValue]);

  const handleSkillSearch = (event) => {
    const skillName = event.target.value;
    setSearchQuery(skillName);
  };

  const handleSelectedSkills = (event, value) => {
    const selectedSkillNames = value.map((skill) => skill.name);
    setSkillOptions(selectedSkillNames);
    console.log(selectedSkillNames)
  };

  ;

  return (
    <>
      <Autocomplete
        multiple
        id="free-solo-demo"
        onChange={handleSelectedSkills}
        options={skills}
        getOptionLabel={(skill) => skill.name}
        renderInput={(params) => (
          <TextField {...params} label="Skills" onChange={handleSkillSearch} />
        )}
      />
    </>
  );
};

export default SkillSearch;

{/* <TextField
        label="Search Skills"
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => console.log(e.target.value)}
      /> */}