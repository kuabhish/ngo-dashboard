import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'


class StartPage extends Component{
    loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

    constructor(props){
        super(props)
        this.state={
            page_state:"initial_page"
        }
        this.gotoRequestPage = this.gotoRequestPage.bind(this);
        this.gotoStatusPage = this.gotoStatusPage.bind(this);
    }

    gotoRequestPage(){
        this.setState({page_state:"request_page"})
    }

    gotoStatusPage(){
        this.setState({page_state:"status_check"})
    }
    
    render(){
        let initial_page_view;
        if (this.state.page_state=="initial_page"){
            initial_page_view = <div className="col-lg-8 align-self-center">
            <div className="block">
                <h1>
                    Oxygen Cylinders
                <br />
                    .. NGO
                </h1>
            </div>

            <div className="block" style={{margin:100}}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{height:50  , width:300}}
                    onClick={ () => this.gotoRequestPage() }
                    >
                    Request for Oxygen Cylinder
                </Button>
            </div>

            <div className="block" style={{margin:100}}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{height:50 , width:300}}
                    onClick={ () => this.gotoStatusPage() }
                    >
                    Check the Status
                </Button>
            </div>

        </div>
        }

        if (this.state.page_state=="request_page"){
            return(<Redirect to="/request" />)
        }

        if (this.state.page_state=="status_check"){
            return(<Redirect to="/status_check" />)
        }

        return(
            <div>
                {initial_page_view}
            </div>
        )
    }
}

export default StartPage;