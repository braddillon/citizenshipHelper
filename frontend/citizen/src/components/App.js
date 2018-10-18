import React, { Component } from 'react';
import { connect } from 'react-redux';

// import logo from './logo.svg';
//import './App.css';
import Test from '../containers/Test';
import QuestionBuilder from '../components/QuestionBuilder/QuestionBuilder';
import QuestionApproval from '../containers/QuestionApproval';
import ProblemQuestion from '../containers/ProblemQuestion';
import TestLog from '../containers/TestLog';

import Signin from '../containers/Forms/Signin'
import { signInUser, signoutUser } from '../actions/authentication';
import { fetchSections, fetchAccount } from '../actions';

import Header from '../components/Layout/Header';
import Drawer from '../components/Layout/Drawer';
import { Route, Switch } from 'react-router'; // react-router v4
import { withRouter } from 'react-router-dom';
import RequireAuth from '../components/auth/require_auth';
import Spinner from '../components/UI/Spinner/Spinner';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import { STAFF, REGULAR } from './auth/require_auth'

import _ from 'lodash';

const theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: {
        main: '#f44336',
      },
    },
  });

class App extends Component {
    state = {
        mobileSideDrawerOpen: false,
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            mobileSideDrawerOpen: !prevState.mobileSideDrawerOpen
        }));
    };

    componentDidMount() {
        this.props.fetchSections();
        this.props.fetchAccount();
    }

    render() {
        if (this.props.authenticated && (_.isEmpty(this.props.sections) || _.isEmpty(this.props.account))) {
            return <Spinner />
        }
        return (
            <MuiThemeProvider theme={theme}>
            <div className="App">
                <Header
                    clickButton={this.toggleDrawer}
                    sidebar={this.state.mobileSideDrawerOpen}
                    authenticated={true}
                    handleSignIn={this.props.signInUser}
                    handleSignOut={this.props.signoutUser}
                />

                                {/* <Header
                    authenticated={this.props.authenticated}
                    clickButton={this.toggleDrawer}
                    sidebar={this.state.mobileSideDrawerOpen}
                    handleSignIn={this.props.signInUser}
                    handleSignOut={this.props.signoutUser}
                /> */}

                <div
                    style={{
                        flexGrow: 1,
                        height: 430,
                        zIndex: 1,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                    }}
                >
                    <Drawer
                        toggleDrawer={this.toggleDrawer}
                        sidebar={this.state.mobileSideDrawerOpen}
                        authenticated={this.props.authenticated}
                        account={this.props.account}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            padding: 20
                        }}
                    >
                        <Switch>
                            {/* <Route path="/test" component={RequireAuth(Test, Viewer)} /> */}
                            {/* <Route path="/qbmc/" component={RequireAuth(QuestionBuilderMC, Admin)} />
                            <Route path="/qbtf/" component={RequireAuth(QuestionBuilderTrueFalse, Admin)} /> */}
                            <Route path="/qb/" component={RequireAuth(QuestionBuilder, REGULAR)} />
                            <Route path="/qa/" component={RequireAuth(QuestionApproval, STAFF)} />
                            <Route path="/problems/" component={RequireAuth(ProblemQuestion, REGULAR)} />
                            <Route exact path="/testLog/" component={RequireAuth(TestLog, REGULAR)} />
                            {/* <Route path="/testLog/:number" component={RequireAuth(TestLogGranular, Viewer)} /> */}
                            {/* <Route path="/qb/" component={RequireAuth((props) => <QuestionBuilder {...props} sections={this.props.sections} />, Admin)} /> */}

                            <Route path="/signin/" component={Signin} />
                            
                            <Route path="/" component={RequireAuth(Test, REGULAR)} />
                            
                            {/* <Route path="/" component={Test} /> */}
                        </Switch>
                    </div>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

// signInForm =
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        sections: state.sections,
        account: state.account
        // q: state.questions
    };
}

export default withRouter(connect(
    mapStateToProps,
    { signInUser, signoutUser, fetchSections, fetchAccount },
)(App));

//export default App;
