import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Grid
} from "@material-ui/core";
import {
  Header,
  Footer,
  TabPanel,
  TableView
} from './component';
import { ContentContainer, LinkText } from "./component/styledComponents";
import { accountsData } from "./mock/account-mock";

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
  const [value, setValue] = useState(0);
  const [rowData, setRowData] = useState(accountsData);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setRowData(accountsData.filter(d => d.year <= 2012))
    } else if (newValue === 1) {
      setRowData(accountsData.filter(d => d.year <= 2004))
    }
    else {
      setRowData(accountsData.filter(d => d.year <= 2008))
    }
  };

  return (
    <div className={classes.root}>
      <Header />
      <ContentContainer>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Box p={1}>
                <Typography>View and Add Accounts</Typography>
              </Box>
              <Box p={1}>
                <LinkText href="#">Learn More</LinkText>
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
                <Tab label={`All (${accountsData && accountsData.filter(d => d.year <= 2012).length})`} {...a11yProps(0)} />
                <Tab label={`LessThan 2004 (${accountsData && accountsData.filter(d => d.year <= 2004).length})`} {...a11yProps(1)} />
                <Tab label={`LessThan 2008 (${accountsData && accountsData.filter(d => d.year <= 2008).length})`} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {rowData && <TableView rowData={rowData} />}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {rowData && <TableView rowData={rowData} />}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {rowData && <TableView rowData={rowData} />}
            </TabPanel>
          </Grid>
        </Grid>
      </ContentContainer>
      <Footer />
    </div>
  );
}
