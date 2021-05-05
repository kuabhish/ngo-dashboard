import React , {Component, useEffect } from 'react';
import {  Switch , Route, HashRouter, Redirect, useLocation, useHistory } from 'react-router-dom';

import StartPage from './StartPage';
import RequestPage from './RequestPage';
import StatusCheck from './StatusCheck';
import history from './history';

export default function PageManager() {
    const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


        return(
            <div>
                <HashRouter>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route 
                                path='/home' 
                                render={
                                    (props) => (
                                        <StartPage {...props} history={history} />
                                    )
                                }
                                />
                            <Route 
                                path='/request' 
                                render={(props) => (
                                    <RequestPage {...props} />
                                )}
                            />
                            <Route 
                                path='/status_check' 
                                render={(props) => (
                                    <StatusCheck {...props}  />
                                )}
                                // component={StatusCheck} 
                            />
                            <Redirect 
                                from="/" 
                                to="/home" 
                            />
                            
                        </Switch>
                    </React.Suspense>
                </HashRouter>  
            </div>
        )
}