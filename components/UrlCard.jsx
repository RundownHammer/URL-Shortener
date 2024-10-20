import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';

const UrlCard = (props) => {
  const [copy, setCopy] = React.useState("Copy");

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopy("Copied");
    setTimeout(() => {
      setCopy("Copy");
    }, 1000);
  }

  return (<>
    <Card sx={{ minWidth: 275 , maxWidth: 300}} variant="outlined">
    <CardContent>
      <Typography variant="h5" component="div">
        {props.name}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5,marginTop:"10px"}}>        
        <a href={props.url} target="_blank" rel="noopener noreferrer" onClick={() => {props.handleUrlClick(props.url)}}>{props.url}</a>
      </Typography>
      <Chip label={props.visited} style={{position: "relative", top:"-78px", left:"240px"}}/>
    </CardContent>
    <CardActions sx={{marginTop:"-50px", gap:"158px"}} display={{display:"flex"}}>
      <Button size="small" onClick={() => {copyUrl(props.url)}}>{copy}</Button>
      <Button size="small" sx={{color:"red"}} onClick={() => {props.handleUrlDelete(props.url)}}><DeleteIcon /></Button>
    </CardActions>
  </Card>
</>
  );
}

export default UrlCard;