import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
// import history from './history';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import RequestPage from './RequestPage';
import StatusCheck from './StatusCheck';

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
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="Create Request" {...a11yProps(0)} />
            <Tab label="Search" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <RequestPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StatusCheck />
        </TabPanel>
      </div>
    );
}
  



// class StartPage extends Component{
//     loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

//     constructor(props){
//         super(props)
//         this.state={
//             page_state:"initial_page"
//         }
//         this.gotoRequestPage = this.gotoRequestPage.bind(this);
//         this.gotoStatusPage = this.gotoStatusPage.bind(this);
//     }

//     gotoRequestPage(){
//         this.setState({page_state:"request_page"})
//     }

//     gotoStatusPage(){
//         this.setState({page_state:"status_check"})
//     }
    
//     render(){
//         let initial_page_view;
//         if (this.state.page_state=="initial_page"){
//             initial_page_view = <div className="col-lg-10 align-self-center">
//             <div className="block">
//                 <h1>
//                     Oxygen Cylinders
//                 <br />
//                     .. NGO
//                 </h1>
//             </div>

//             <div className="block" style={{margin:100}}>
//                 <Button 
//                     variant="contained" 
//                     color="primary" 
//                     style={{height:50  , width:300}}
//                     onClick={ () => this.gotoRequestPage() }
//                     >
//                     Request for Oxygen Cylinder
//                 </Button>
//             </div>

//             <div className="block" style={{margin:100}}>
//                 <Button 
//                     variant="contained" 
//                     color="primary" 
//                     style={{height:50 , width:300}}
//                     onClick={ () => this.gotoStatusPage() }
//                     >
//                     Check the Status
//                 </Button>
//             </div>

//         </div>
//         }

//         if (this.state.page_state=="request_page"){
//             // this.props.history.push("/request")
//             return(<Redirect to="/request" />)
//         }

//         if (this.state.page_state=="status_check"){
//             // this.props.history.push("/status_check")
//             return(<Redirect to="/status_check" />)
//         }

//         return(
//             <div>
//                 {initial_page_view}
//             </div>
//         )
//     }
// }

// export default StartPage;