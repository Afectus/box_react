import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';

import history from '../../functions/history';
import { loadGoodsList, loadGoodsTax } from '../../actions/goods';
import { authTokenCookie, authDelete } from '../../actions/auth';
import { cookieCheck, checkDebug } from '../../actions/check';

import Navigation from './Navigation';
import TopHeader from './TopHeader';
import DebugBox from '../common/DebugBox';
import Inspinia from '../../functions/inspinia';

class Main extends React.Component {

    state = {
        auth_token: null
    }

    componentDidMount() {

        Inspinia();

        const auth_token = cookie.load('auth_token');
        
        const debug = cookie.load('debug');
        this.props.debug(debug === "true");

        if(auth_token) {
            this.props.authCookie(auth_token);
            this.props.load(auth_token);
            this.props.loadTax(auth_token);
            this.setState({auth_token: auth_token});
            if(cookie.load('check_id')) {
                this.props.newCheck(cookie.load('check_id'));
            }
        } else {
            history.push('/login');
        }
    }

    render() {
        let wrapperClass = "gray-bg";
        return (
            <div id="wrapper">
                <Navigation />
                <div id="page-wrapper" className={wrapperClass}>
                    <TopHeader auth={this.state.auth_token}/>
                    {this.props.debugStatus && this.state.auth_token &&
                        <div className="m-t"><DebugBox /></div>
                    }
                    {this.props.children}
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        debugStatus: state.core.debug
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            load: loadGoodsList,
            loadTax: loadGoodsTax,
            authCookie: authTokenCookie,
            newCheck: cookieCheck,
            logout: authDelete,
            debug: checkDebug
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);