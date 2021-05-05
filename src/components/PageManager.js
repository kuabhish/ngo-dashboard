import React , {Component } from 'react';
import {  Switch , Route, HashRouter, Redirect } from 'react-router-dom';

import StartPage from './StartPage';
import RequestPage from './RequestPage';
import StatusCheck from './StatusCheck';

class PageManager extends Component{
    loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

    render(){
        return(
            <div>
                <HashRouter>
                    <React.Suspense fallback={this.loading()}>
                        <Switch>
                            <Route path='/home' component={StartPage} />
                            <Route path='/request' component={RequestPage} />
                            <Route path='/status_check' component={StatusCheck} />
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </React.Suspense>
                </HashRouter>  
            </div>
        )
    }
}

export default PageManager;