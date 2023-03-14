import { Box, Grid, Typography, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import emailjs from "@emailjs/browser";
import { UserContext } from "../../context/user";
import { useHistory } from "react-router-dom";

const Applicant = ({ applicant }) => {
  const [disabled, setDisabled] = useState(false);
  const { user, setUser } = useState(UserContext);
  const {
    applied_time,
    resume_url,
    job_title,
    company_name,
    compensation,
    compensation_type,
    location,
    location_type,
    employment_type,
    name,
    email,
    avaliability,
    sponsorship,
    work_authorization,
  } = applicant;

  const handleViewResume = () => {
    window.open(resume_url, "_blank");
  };
  console.log(avaliability);
  function handleEmail() {
    const templateID = "template_32a8ov7";
    const serviceID = "service_0fola18";
    const publicKey = "9YObmu3xFlN4ceQik";
    const applicantData = {
      name: name,
      company: company_name,
      title: job_title,
      application_date: applied_time,
      email: email,
    };
    console.log(email);
    emailjs.send(serviceID, templateID, applicantData, publicKey);
    setDisabled(true);
  }

  return (
    <Grid
      container
      alignItems="center"
      p={2}
      sx={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <a href={`mailto:${email}`}>{email}</a>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Applicant Details</Typography>
          <Typography variant="subtitle2">
            Availability: {avaliability}
          </Typography>
          <Typography variant="subtitle2">
            {sponsorship
              ? "Requires sponsorship"
              : "Does not require sponsorship"}
          </Typography>
          <Typography variant="subtitle2">
            {work_authorization
              ? "Authorized to work"
              : "Not authorized to work"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Applied Time</Typography>
          <Typography variant="subtitle2">{applied_time}</Typography>
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleViewResume}>
              View Resume
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disabled={disabled}
              onClick={handleEmail}
            >
              Interested
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Applicant;
