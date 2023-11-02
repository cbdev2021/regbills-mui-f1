import { Container, Grid, Typography, Button, IconButton } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: "black", padding: "40px 0", color: "#FFFFFFB3" }}>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h4" sx={{ margin: "15px" }}>
              Categories
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Groceries
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Utilities
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Dining
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Transportation
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h4" sx={{ margin: "15px" }}>
              Services
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Expenses Tracking
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Budget Planning
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Reports
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h4" sx={{ margin: "15px" }}>
              About Us
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Contact Us
            </Typography>
            <Typography variant="h6" sx={{ margin: "15px" }}>
              Privacy Policy
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h4" sx={{ margin: "15px" }}>
              Connect With Us
            </Typography>
            <IconButton href="#" sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <LinkedIn />
            </IconButton>
            <Button
              variant="outlined"
              color="secondary" // Color de botón secundario
              href="#"
              sx={{ color: "white", borderColor: "white", marginTop: "15px" }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
