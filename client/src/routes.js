import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

  Redirect
} from "react-router-dom";


import { AuthPage } from "./pages/AuthPages"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        console.log('isAuthenticated', isAuthenticated)
        return (
                <Switch>
                    <Route   path="/links" component={LinksPage} />
                    <Route   path="/create" component={CreatePage} />
                    <Route  exact path="/detail/:id" component={DetailPage} />
                    <Route path="/"  component={AuthPage} exact />
                    {/* <Route path="/"  component={CreatePage}/> */}
                    <Redirect to="/create" />
                </Switch>
      
        )
    } 
    
        return (
            <Switch>
                <Route path="/"  component={AuthPage} exact />
                <Redirect to="/"/>
            </Switch>
        )
   

    
}