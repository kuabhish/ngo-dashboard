import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Row,
  } from 'reactstrap';

var AWS = require('aws-sdk');

AWS.config.update({
  region: "ap-south-1",
  accessKeyId:  process.env.REACT_APP_ACCESSKEYID , 
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
});

class StatusCheck extends Component{

    constructor(props){
        super(props)
        this.state={
            search_string:"",
            requests:[],
            expanded:false,
            selected_data:{}
        }
        this.updateSearchString = this.updateSearchString.bind(this)
        this.search = this.search.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.select = this.select.bind(this)
        this.setExpanded = this.setExpanded.bind(this)
        // this.selectData = this.selectData.bind(this)
    }

    

    select(event){
        console.log(event)
        console.log(Object.keys(event).length)
        this.setState({selected_data:event})
    }

    fetchData(string){
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName:"ngo_all_request_table",
            Key:{
                "phone_number" : string 
            }
        };
        docClient.scan(params , (err, data) => {
            if (err){
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            }
            else{
                console.log(data)
                console.log(data.Items)
                for (var i = 0; i < data.Items.length ; i++){
                    if (data.Items[i].phone_number == string ){
                        this.setState({
                            requests: [
                                ...this.state.requests,
                                data.Items[i]
                            ]
                        })
                    }
                }
                console.log(this.state.requests)
            }
        })
    }

    updateSearchString(event){
        this.setState({search_string:event.target.value})
    }

    search(event){
        event.preventDefault()
        console.log(this.state.search_string)
        console.log("here")
        this.fetchData(this.state.search_string)
    }

    

    setExpanded(val){
        this.setState({expanded:val})
    }
    
    render(){

        return(
            <div>


                
            <Container component="main" maxWidth="xs">

                
                <div>
                    <div className="col-lg-10 align-self-center" style={{margin:20}}>
                        <h1>
                            Check the status of the request made
                        </h1>
                    </div>

                    {/* <div className="float-left">
                        <ArrowBackIcon style={{fontSize:50}} />
                    </div> */}

                </div>
                

                <TextField
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="Phone Number"
                    label="10 digit Phone Number"
                    id="age"
                    type="number"
                    onChange={(e) => this.updateSearchString(e)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e)=> this.search(e)}
                >
                    Search
                </Button>

            </Container>
            <br />



            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell >Patient's Name</TableCell>
                        <TableCell >Age</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Address</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.requests.map((row) => (
                        <TableRow key={row.request_number}>
                            <TableCell >{row.Name}</TableCell>
                            <TableCell >{row.Age}</TableCell>
                            <TableCell >{row.email}</TableCell>
                            <TableCell >{row.address}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(event)=> this.select(row)}
                                >
                                    Select
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Container component="main" maxWidth="xs">
                <div className="col-lg-10 align-self-center" style={{margin:20}}>
                    <h1>
                        Details
                    </h1>
                </div>

                <TableContainer component={Paper}>
                <Table  aria-label="simple table" >

                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell colSpan={2}></TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow key={"Name"}>
                            <TableCell style={{width:"200%"}}>Name</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.Name}</TableCell>
                        </TableRow>

                        <TableRow key={"Age"}>
                            <TableCell style={{width:"200%"}}>Age</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.Age}</TableCell>
                        </TableRow>

                        <TableRow key={"Address"}>
                            <TableCell style={{width:"200%"}}>Address</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.address}</TableCell>
                        </TableRow>

                        <TableRow key={"Aadhar"}>
                            <TableCell style={{width:"200%"}}>Aadhar</TableCell>
                            <TableCell style={{width:"200%"}}>
                                {/* {this.state.selected_data.aadhar_url} */}
                                <a
                                    href={this.state.selected_data.aadhar_url}
                                    target="_blank"
                                    >
                                    {this.state.selected_data.aadhar_url}
                                </a>
                            </TableCell>
                        </TableRow>


                        <TableRow key={"Doctor's Prescription"}>
                            <TableCell style={{width:"200%"}}>Doctor's Prescription</TableCell>
                            <TableCell style={{width:"200%"}}>
                                <a
                                    href={this.state.selected_data.doctor_url}
                                    target="_blank"
                                    >
                                    {this.state.selected_data.doctor_url}
                                </a>
                            </TableCell>
                        </TableRow>

                        <TableRow key={"Phone Number"}>
                            <TableCell style={{width:"200%"}}>Phone Number</TableCell>
                            <TableCell style={{width:"200%"}}>
                                {this.state.selected_data.phone_number}
                            </TableCell>
                        </TableRow>

                        <TableRow key={"Back up Phone Number"}>
                            <TableCell style={{width:"200%"}}>Back up Phone Number</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.back_up_phone_number}</TableCell>
                        </TableRow>

                        

                        <TableRow key={"Email"}>
                            <TableCell style={{width:"200%"}}>Email</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.email}</TableCell>
                        </TableRow>

                        <TableRow key={"SRF Number"}>
                            <TableCell style={{width:"200%"}}>SRF Number</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.SRF_Number}</TableCell>
                        </TableRow>

                        <TableRow key={"Number of Days"}>
                            <TableCell style={{width:"200%"}}>Number of Days</TableCell>
                            <TableCell style={{width:"200%"}}>{this.state.selected_data.number_of_days}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

                

            </Container>
    
        </div>
        )
    }
}

export default StatusCheck;