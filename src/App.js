import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { IconButton, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import StopIcon from "@material-ui/icons/Stop";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Box p={3}>
              <Typography>View and Add Accounts</Typography>
            </Box>
            <Box p={3}>
              <a href="#">Learn More</a>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Grid
                      container
                      spacing={1}
                      alignItems="flex-end"
                      style={{ marginTop: "-25px" }}
                    >
                      <Grid item>
                        <SearchIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label="Search" />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      style={{ marginTop: "-20px" }}
                    >
                      <Grid item>
                        <Typography variant="body2">View</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <ViewModuleIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <FormatListBulletedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Box>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <StopIcon style={{ color: "#FFA500" }} />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: "#FFA500" }}
                        >
                          {"Data1"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <StopIcon style={{ color: "gray" }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{ color: "gray" }}>
                          {"Data2"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                  <AgGridReact rowData={rowData}>
                    <AgGridColumn field="make"></AgGridColumn>
                    <AgGridColumn field="model"></AgGridColumn>
                    <AgGridColumn field="price"></AgGridColumn>
                  </AgGridReact>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
