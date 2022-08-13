import { Link } from "react-router-dom";
// MATERIAL UI
import { Typography, Divider } from "@mui/material";
import { StyledPaper } from "./PostDetails/styled";
import HomeIcon from '@mui/icons-material/Home';

const Missing = () => {
  return (
    <StyledPaper style={{marginBottom: "435px"}}>
      <Typography variant="h5" color="textSecondary">
        Page Not Found
      </Typography>
      <Divider />
      <Typography variant="h6" color="textSecondary">
        Well, that's disappointing.
      </Typography>

      <Link style={{ textDecoration: "none" }} to="/">
        <Typography variant="h5" color="textSecondary">
         <HomeIcon style={{marginBottom: "-3px"}} /> Visit Our Homepage
        </Typography>
      </Link>
    </StyledPaper>
  );
};

export default Missing;
