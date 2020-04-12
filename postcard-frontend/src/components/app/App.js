import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Header from "../header/header";
import SignInPage from "../sign-in/sign-in";
import UserProfile from "../user-profile/UserProfile";
import LandingPage from "../landing-page/LandingPage";
import CreatePostcard from "../create-postcard/create-postcard";

import * as ROUTES from '../constants/routes';
import Footer from "../footer/footer";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null
    };
    this.auth = null;
  }

  updateState(state) {
      this.setState({
          user: state
      });
  }

  render() {

    const routing = (
      <Router>
        <Header user={this.state.user}/>

        <main role="main">
            <div>
                <Route path={ROUTES.LANDING} exact render={() =><LandingPage/>}/>
                <Route path={ROUTES.SIGN_IN} exact render={() =>(
                    this.state.user?
                        <Redirect to={{ pathname: ROUTES.USER_PROFILE}} />
                    :<SignInPage user={this.state.user} onUserLogin={(state) => this.updateState(state)}/>)}/>
                <Route path={ROUTES.USER_PROFILE} render={()=>(
                    this.state.user?
                    <UserProfile user={this.state.user} onUserSignOut={(state) => this.updateState(state)}/>
                    :<Redirect to={{pathname: ROUTES.SIGN_IN}}/>)}/>
                <Route path={ROUTES.CREATE_POSTCARD} render={()=> (
                    this.state.user ?
                        <CreatePostcard user={this.state.user}/>
                    :<Redirect to={{pathname: ROUTES.SIGN_IN}}/> )}/>
            </div>
        </main>

        <Footer/>

      </Router>
    );

    return (
            <div className="App">
                {routing}
            </div>
    )
  }
}

export default App;
