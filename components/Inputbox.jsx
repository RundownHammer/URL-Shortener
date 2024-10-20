import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Paper } from "@mui/material";

const Inputbox = ({addUrl, errorMessage}) => {
  const [urlnameEmpty, setUrlNameEmpty] = useState(false);
  const [urlInvalid, setUrlInvalid] = useState(false);
  const [url, setUrl] = useState({
    address: "",
    name: "",
    timesVisited: 0,
  });

  // a regular expression to validate the URL
  const URLpattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUrl((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  }

  const handleSubmit = (e) => {
    setUrlNameEmpty(false);
    setUrlInvalid(false);
    if (!url.name) {
      setUrlNameEmpty(true);
      return
      };  

    if (URLpattern.test(url.address) == false) {
      setUrlInvalid(true);
      return
      };
    e.preventDefault();
    console.log(url);
    addUrl(url);
    setUrl({
      address: "",
      name: "",
      timesVisited: 0,
    });
  }

  return (
    <Paper elevation={3} className="input-div">
      <form className="input-form" style={{display:"flex", flexDirection:"column", gap:"16px"}}>
      <TextField id="outlined-basic" label="Enter URL name" variant="standard" type="text"
        {...(urlnameEmpty && ({ error: true, helperText: "URL name cannot be empty" }))}
        sx={{margin:"12px"}}
        color="warning"
        name="name"
        value={url.name}
        onChange={handleChange}
        size="small"
      />
      <TextField id="outlined-basic" label="Enter URL" variant="standard" type="text"
        sx={{margin:"-16px 12px 12px 12px"}}
        color="warning"
        {...(urlInvalid && ({ error: true, helperText: "Enter a valid URL" }))}
        name="address"
        value={url.address}
        onChange={handleChange}
        size="small"
        />
        <p style={{display: errorMessage == ""? "none" : "", color:"red", marginTop:"-20px"}}>{errorMessage}</p>
      <Button id="submit-button" style={{marginBottom:"24px"}} sx={{color:"#f5ba13", border:"1px solid #f5ba13", fontFamily:"sans-serif"}} variant="outlined" onClick={handleSubmit}>Shorten</Button>
    </form>
    </Paper>
  );
}

export default Inputbox