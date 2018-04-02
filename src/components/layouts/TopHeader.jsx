import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newCheck, checkReset, checkDebug } from '../../actions/check';
import { authDelete } from '../../actions/auth';

class TopHeader extends React.Component {

    state = {
        debug: false,
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.debugStatus) {
            this.setState({debug: nextProps.debugStatus});
        }
    }

    handleDebug(e) {
        this.props.debug(!this.state.debug);
        this.setState({
            debug: !this.state.debug
        });
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <span ref={el => this.menubtn = el} className="navbar-minimalize minimalize-styl-2 btn btn-primary werty" >
                            <i className="fa fa-bars"></i> 
                        </span>
                        {this.props.auth &&
                            <button 
                                onClick={() => this.props.newCheck()}
                                type="button" 
                                className="minimalize-styl-2 btn btn-w-m btn-success">
                                    Создать чек
                            </button>
                        }

                        {this.props.checkID && this.props.auth &&
                            <span>
                                {/* <button type="button" onClick={() => this.props.recalc(this.props.checkID)} className="minimalize-styl-2 btn btn-w-m btn-primary">Recalc</button>
                                <button type="button" onClick={() => this.props.test(this.props.checkID)} className="minimalize-styl-2 btn btn-w-m btn-primary">Test</button>
                                <button 
                                    onClick={() => this.props.validCheck(this.props.checkID)}
                                    type="button" 
                                    className="minimalize-styl-2 btn btn-w-m btn-warning"
                                >Valid</button> */}
                                <button type="button" onClick={() => this.props.reset()} className="minimalize-styl-2 btn btn-w-m btn-danger">Сброс чека</button>
                                {/* <button type="button"  data-toggle="modal" data-target="#check-id" className="minimalize-styl-2 btn btn-w-m btn-info">Открыть чек</button> */}
                            </span>
                        }
                    </div>
 
                    {this.props.auth &&
                        <ul className="nav navbar-top-links navbar-right">    
                            <li>
                                <div className="checkbox checkbox-inline checkbox-primary">
                                    <input 
                                        type="checkbox" 
                                        checked={this.state.debug} 
                                        onChange={this.handleDebug.bind(this)} 
                                        id="debugging" 
                                    />
                                    <label htmlFor="debugging"> Отладка </label>
                                </div>
                            </li>
                            <li>
                                <a onClick={() => this.props.authDelete(this.props.token)}>
                                    <i className="fa fa-sign-out"></i> Выход
                                </a>
                            </li>
                        </ul>
                    }
                </nav>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        checkID: state.core.checkID,
        token: state.core.auth_token,
        debugStatus: state.core.debug
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            newCheck: newCheck,
            authDelete: authDelete,
            reset: checkReset,
            // print: checkPrint
            debug: checkDebug
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(TopHeader);