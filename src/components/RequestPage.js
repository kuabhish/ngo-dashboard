

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
// import S3FileUpload , {uploadFile} from 'react-s3';
import {Redirect} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

 
var cors = require('cors')
var AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');

AWS.config.update({
  region: "ap-south-1",
  accessKeyId:  process.env.REACT_APP_ACCESSKEYID , 
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
});

const s3 = new AWS.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "ap-south-1"
    }
);


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
}));


export default function RequestPage(){
    const classes = useStyles();
    return(<Main 
                classes = {classes}
            />);
}

// Fill in your bucket name and local file name:
const BUCKET_NAME = 'gummysdf'
// const FILE_NAME_LOCAL = './test-file.gif'
// const FILE_NAME_S3 = 'this-will-be-the-file-name-on-s3.gif'
const FILE_PERMISSION = 'public-read'

class Main extends React.Component {

    constructor(props){
        super(props)
        this.state={
            age:0,
            Name:"",
            address:"",
            phone_number:"",
            backup_phone_number:"",
            email_address:"",
            SRF_Number:0,
            Number_Of_days:0,
            acceptTerms:"No",
            securityDepositPay:"No",
            SnackBarOpen:false,
            error_message:"",
            aadharFileBuffer:null,
            aadhar_file_name:null,
            doctors_prescription:null,
            gotohome:false
        }
        this.changeName = this.changeName.bind(this)
        this.changeAge = this.changeAge.bind(this)
        this.handleSecurityDepositAccept = this.handleSecurityDepositAccept.bind(this)
        this.changeAddress = this.changeAddress.bind(this)
        this.changePhoneNumber = this.changePhoneNumber.bind(this)
        this.changeSRFNumber = this.changeSRFNumber.bind(this)
        this.changeEmailAddress = this.changeEmailAddress.bind(this)
        this.changeBackUpPhoneNumber = this.changeBackUpPhoneNumber.bind(this)
        this.handleNumberofDays = this.handleNumberofDays.bind(this)
        this.handleAcceptTerms = this.handleAcceptTerms.bind(this)
        this.submit = this.submit.bind(this)
        this.snackBarOpen = this.snackBarOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.captureAdharFile = this.captureAdharFile.bind(this)
        this.captureDoctorPrescription = this.captureDoctorPrescription.bind(this)
        this.gotoHomePage = this.gotoHomePage.bind(this)
    }

    gotoHomePage(){
        this.setState({gotohome:true})
        // return(<Redirect to="/home" />)
    }

    ErrorMessage(string){
        return <Snackbar 
                    open={this.state.SnackBarOpen} 
                    autoHideDuration={5000} 
                    onClose={this.handleClose}
                >
                <Alert onClose={this.handleClose} severity="error">
                    {string}
                </Alert>
                </Snackbar>
    }

    changeName(event){
        console.log(event.target.value)
        this.setState({Name:event.target.value})
    }

    changeAge(event){
        console.log(event.target.value)
        this.setState({age:event.target.value})
    }

    handleSecurityDepositAccept(event){
        console.log(event.target.checked)
        // this.setState({securityDepositPay:event.target.cheked})
        if (event.target.checked ){
            this.setState({securityDepositPay:"Yes"})
        }
        else{
            this.setState({securityDepositPay:"No"})
        }
    }

    changeAddress(event){
        console.log(event.target.value)
        this.setState({address:event.target.value})
    }

    changePhoneNumber(event){
        console.log(event.target.value)
        this.setState({phone_number:event.target.value})
    }

    changeSRFNumber(event){
        console.log(event.target.value)
        this.setState({SRF_Number:event.target.value})
    }

    changeEmailAddress(event){
        console.log(event.target.value)
        this.setState({email_address:event.target.value})
    }

    changeBackUpPhoneNumber(event){
        console.log(event.target.value)
        this.setState({backup_phone_number:event.target.value})
    }

    handleNumberofDays(event){
        console.log(event.target.value)
        this.setState({Number_Of_days:event.target.value})
    }

    handleAcceptTerms(event){
        console.log(event.target.checked)
        if (event.target.checked ){
            this.setState({acceptTerms:"Yes"})
        }
        else{
            this.setState({acceptTerms:"No"})
        }
    }

    captureAdharFile(event){
        const file = event.target.files[0]
        console.log(file)

        if ( 
            file.name.split(".")[1] === "jpg" ||
            file.name.split(".")[1] === "png"
            )
         {  
          const reader = new window.FileReader()
          reader.readAsArrayBuffer(file)
          reader.onloadend = () => {
            this.setState({ aadharFileBuffer: Buffer(reader.result ) })
            this.setState({aadhar_file_name:file.name})
            console.log('buffer --- ', this.state.aadharFileBuffer)
          }
        }
    }

    captureDoctorPrescription(event){
        const file = event.target.files[0]

        if ( 
            file.name.split(".")[1] === "jpg" ||
            file.name.split(".")[1] === "png"
            )
         {
          const reader = new window.FileReader()
          reader.readAsArrayBuffer(file)
          reader.onloadend = () => {
            this.setState({ doctors_prescription: Buffer(reader.result) })
            this.setState({prescription_file_name:file.name})
            console.log('buffer --- ', this.state.doctors_prescription)
          //   console.log('path --- ', this.state.file_path.name)
          }
        }
    }

    getContentTypeByFile(fileName) {
        var rc = 'application/octet-stream';
        var fn = fileName.toLowerCase();
    
        if (fn.indexOf('.html') >= 0) rc = 'text/html';
        else if (fn.indexOf('.css') >= 0) rc = 'text/css';
        else if (fn.indexOf('.json') >= 0) rc = 'application/json';
        else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
        else if (fn.indexOf('.png') >= 0) rc = 'image/png';
        else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
    
        return rc;
    }

    submit(e){
        e.preventDefault()
        if (!this.state.aadharFileBuffer){
            console.log("name empty")
            this.state.error_message = "Upload AAdhar File"
            this.snackBarOpen(true)
        }

        if (!this.state.doctors_prescription){
            console.log("name empty")
            this.state.error_message = "Upload Doctor's Prescription"
            this.snackBarOpen(true)
        }

        if ( this.state.Name == "" ){
            console.log("name empty")
            this.state.error_message = "Name not written"
            this.snackBarOpen(true)
        }

        if ( this.state.address == "" ){
            console.log("age empty")
            this.state.error_message = "Address not written"
            this.snackBarOpen(true)
        }

        if ( this.state.age == 0 ){
            console.log("age empty")
            this.state.error_message = "Age not written"
            this.snackBarOpen(true)
        }

        if ( this.state.phone_number == 0 ){
            console.log("age empty")
            this.state.error_message = "Phone Number not written"
            this.snackBarOpen(true)
        }

        if ( this.state.email_address == 0 ){
            console.log("age empty")
            this.state.error_message = "Email not written"
            this.snackBarOpen(true)
        }

        if ( this.state.backup_phone_number == 0 ){
            console.log("age empty")
            this.state.error_message = "Back up Phone Number not written"
            this.snackBarOpen(true)
        }

        if ( this.state.SRF_Number == 0 ){
            console.log("age empty")
            this.state.error_message = "SRF Number not written"
            this.snackBarOpen(true)
        }

        if ( this.state.Number_Of_days == 0 ){
            console.log("age empty")
            this.state.error_message = "Number not days should be greater than 0"
            this.snackBarOpen(true)
        }

        if ( this.state.acceptTerms== "No"  ){
            console.log("age empty")
            this.state.error_message = "Accept Terms And Conditions"
            this.snackBarOpen(true)
        }

        else{
            //submit
            console.log("submitting .. ")

            console.log("uploading aadhar file ")

            const ext_aadhar = this.getContentTypeByFile(this.state.aadhar_file_name)
            const ext_prescription = this.getContentTypeByFile(this.state.prescription_file_name)
            // console.log(this.state.aadhar_file_name)
            console.log(ext_aadhar , ext_prescription)


            const params_aadhar = {
                Bucket: 'sadnesswtf', // pass your bucket name
                Key: this.state.phone_number.toString()+"_aadhar_"+'.'+ext_aadhar.split("/")[1] , 
                Body: this.state.aadharFileBuffer, //JSON.stringify(this.state.aadharFileBuffer, null, 2),
                ACL:'public-read',
                ContentType:ext_aadhar
            };

            const params_prescription = {
                Bucket: 'sadnesswtf', // pass your bucket name
                Key: this.state.phone_number.toString()+"_prescription_"+'.'+ext_aadhar.split("/")[1] , 
                Body: this.state.doctors_prescription, //JSON.stringify(this.state.aadharFileBuffer, null, 2),
                ACL:'public-read',
                ContentType:ext_aadhar
            };

            s3.upload(params_aadhar, (s3Err, data) => {
                if (s3Err) throw s3Err
                console.log(`File uploaded successfully at ${data.Location}`)

                var aadhar_location = data.Location;

                console.log("uploading aadhar file ")

                s3.upload(params_prescription , (s3Err, data) =>{
                    if (s3Err) throw s3Err
                    console.log(`File uploaded successfully at ${data.Location}`)

                    var prescription_location = data.Location;

                    const docClient = new AWS.DynamoDB.DocumentClient();
                    var params = {
                        TableName:"ngo_phone_request_count",
                        Key:{
                            "phone_number" : this.state.phone_number ,
                        }
                    };
                    docClient.get(params , (err , data)=> {
                        if (err){
                            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                        }
                        else{
                            console.log("obtained item:", data , JSON.stringify(data, null, 2));
                            console.log(data)
                            if (data["Item"]){
                                console.log("item exists")
                                console.log("increaing request count .. ")
                                var increased_count = Number(data["Item"]["count"]) + 1
                                var params = {
                                    TableName:"ngo_phone_request_count",
                                    Item:{
                                        "phone_number" : {S: this.state.phone_number},
                                        "count": {N: (Number(data["Item"]["count"]) + 1).toString() }
                                    }
                                };
                                const docClient = new AWS.DynamoDB();
                                docClient.putItem(params, async (err, data1) => {
                                    if (err) {
                                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                    }
                                    else{
                                        console.log("added")
                                        var params = {
                                            TableName:"ngo_all_request_table",
                                            Item:{
                                                    "phone_number": {S:this.state.phone_number.toString()} ,
                                                    "request_number": {S : (increased_count).toString()} , 
                                                    "Name": {S: this.state.Name },
                                                    "Age":{S: this.state.age },
                                                    "address": { S : this.state.address }, 
                                                    "back_up_phone_number":{S : this.state.backup_phone_number },
                                                    "email":{ S : this.state.email_address },
                                                    "SRF_Number": {S : this.state.SRF_Number },
                                                    "number_of_days": { S : this.state.Number_Of_days },
                                                    "pay_security_deposit":{ S: this.state.securityDepositPay },
                                                    "aadhar_url": { S : aadhar_location },
                                                    "doctor_url":{ S: prescription_location }
                                            }
                                        };
                          
                                        console.log("Adding a new item...");
                                        docClient.putItem(params, (err, data) => {
                                            if (err) {
                                                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                console.log("Added item:", JSON.stringify(data, null, 2));
                                                this.gotoHomePage();
                                            }
                                        });
                                    }
                                })
                            }
                            else{
                                console.log("no item")
                                var params = {
                                    TableName:"ngo_phone_request_count",
                                    Item:{
                                        "phone_number" : {S: this.state.phone_number},
                                        "count": {N:"1"}
                                    }
                                };
                                const docClient = new AWS.DynamoDB();
                                docClient.putItem(params, async (err, data) => {
                                    if (err) {
                                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                    }
                                    else{
                                        console.log("added")

                                        var params = {
                                            TableName:"ngo_all_request_table",
                                            Item:{
                                                    "phone_number": {S:this.state.phone_number.toString()} ,
                                                    "request_number": {S : "1" } , 
                                                    "Name": {S: this.state.Name },
                                                    "Age":{S: this.state.age },
                                                    "address": { S : this.state.address }, 
                                                    "back_up_phone_number":{S : this.state.backup_phone_number },
                                                    "email":{ S : this.state.email_address },
                                                    "SRF_Number": {S : this.state.SRF_Number },
                                                    "number_of_days": { S : this.state.Number_Of_days },
                                                    "pay_security_deposit":{ S: this.state.securityDepositPay },
                                                    "aadhar_url": { S : aadhar_location },
                                                    "doctor_url":{ S: prescription_location }
                                            }
                                        };
                          
                                        console.log("Adding a new item...");
                                        docClient.putItem(params, (err, data) => {
                                            if (err) {
                                                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                console.log("Added item:", JSON.stringify(data, null, 2));
                                                this.gotoHomePage();
                                            }
                                        });
                                    }
                                })
                                
                            }
                        }
                    })
                });
            });

        }


    }

    snackBarOpen(e){
        this.setState({SnackBarOpen:e})
    }

    handleClose (event, reason)  {
        if (reason === 'clickaway') {
          return;
        }
        this.snackBarOpen(false);
    };


    render(){
        if (this.state.gotohome){
            return (
              <Redirect to="/home" />
            )
          }

        // let submittingForm;
        // if (this.state.form_submission){
        //     submittingForm = <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        //                         <CircularProgress color="inherit" />
        //                     </Backdrop>
        // }

    return (
  
      <Container component="main" maxWidth="xs">
          
              <div className="col-lg-8 align-self-center">
                  <div className="block">
                      <h1>
                          Complete the Form
                      </h1>
                  </div>
              </div>

                <div className="form-row justify-content-center">
                    <h5 >1. Upload Adhar Card File</h5>
                        
                        <div className={this.props.classes.root}>
                            <input
                                accept="image/*"
                                className={this.props.classes.input}
                                id="inputGroupFile02"
                                // multiple
                                type="file"
                                required
                                aria-describedby="inputGroupFileAddon01"
                                onChange={this.captureAdharFile}
                            />
                                        
                            <label className="custom-file-label" htmlFor="inputGroupFile02">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>

                    
                </div >

                <br />


                <div className="form-row justify-content-center">
                    <h5 >2. Upload Doctor's prescription</h5>
                        
                        <div className={this.props.classes.root}>
                            <input
                                accept="image/*"
                                className={this.props.classes.input}
                                id="inputGroupFile03"
                                // multiple
                                type="file"
                                required
                                aria-describedby="inputGroupFileAddon01"
                                onChange={this.captureDoctorPrescription}
                            />
                                        
                            <label className="custom-file-label" htmlFor="inputGroupFile03">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>

                    
                </div >
             

                <Snackbar 
                    open={this.state.SnackBarOpen} 
                    autoHideDuration={5000} 
                    onClose={this.handleClose}
                    >
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.error_message}
                    </Alert>
                </Snackbar>
        <div>

  
        <form >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Patient's Name"
                name="Name"
                autoFocus
                onChange={(event)=>this.changeName(event)}
            />
  
            <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="Age"
                label="Patient's Age"
                type="number"
                id="age"
                onChange={(e) => this.changeAge(e)}
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="Address"
                label="Address"
                id="address"
                onChange={(e) => this.changeAddress(e)}
                required
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="Phone Number"
                label="Phone Number"
                id="phone_number"
                onChange={(e) => this.changePhoneNumber(e)}
                required
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="Phone Number"
                label="Backup Phone Number"
                id="phone_number"
                onChange={(e) => this.changeBackUpPhoneNumber(e)}
                required
            />

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => this.changeEmailAddress(e)}
            />

            <TextField
                required
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="SRF Number"
                label="SRF Number"
                type="number"
                id="srf_number"
                onChange={(e) => this.changeSRFNumber(e)}
            />



            <div className="form-group row">
                    <label htmlFor="target_city" className="col-sm-4 col-form-label">Select Number of Days</label>
                    <div className="col-sm-4">
                      <select
                        onChange={(e)=> this.handleNumberofDays(e)}
                        className="form-control"
                        id="numberOfDays"
                        required
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        {/* {city_items} */}
                      </select>
                    </div>
                  </div>
  
            <FormControlLabel
              control={<Checkbox 
                          value="remember" 
                          color="primary" 
                          onChange={(e)=> this.handleSecurityDepositAccept(e)}
                          />}
              label="Accept To Pay 50,000/- security Deposit"
            />

            <FormControlLabel
              control={<Checkbox 
                          value="remember" 
                          color="primary" 
                          onChange={(e)=> this.handleAcceptTerms(e)}
                          />}
              label="Accept T&C"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e)=> this.submit(e)}
            >
              Submit
            </Button>
            
          </form>
        </div>
  
      </Container>
    );
              }
  }