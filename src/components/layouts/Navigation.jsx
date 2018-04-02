import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { checkPrint } from '../../actions/check';

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse">
                    <ul className="nav fade-in" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element">
                                <span>
                                    {!this.props.user && 
                                        <span className="clear"> 
                                            <span className="text-muted text-xs block"> 
                                                <strong className="font-bold">Неавторизаван!</strong>
                                            </span> 
                                            <span className="text-muted text-xs block">Кассир</span> 
                                        </span>
                                    }
                                    {this.props.user && 
                                        <span className="clear"> 
                                            <span className="text-muted text-xs block"> 
                                                <strong className="font-bold">{this.props.user.first_name} {this.props.user.last_name}</strong>
                                            </span> 
                                            <span className="text-muted text-xs block">Кассир</span> 
                                        </span>
                                    }
                                </span>
                            </div>
                            <div className="logo-element">
                                Б
                            </div>
                        </li>
                        {this.props.user && 
                            [<li key='nav-1' className="nav-item">
                                <Link to="/">
                                    <i className="fa fa-home"></i>
                                    <span className="nav-label">Главная</span>
                                </Link>
                            </li>,
                            <li key='nav-2' className="nav-item">
                                <Link to="/search">
                                    <i className="fa fa-search"></i> 
                                    <span className="nav-label">Поиск карт</span>
                                </Link>
                            </li>,
                            <li key='nav-3' className="nav-item">
                                <Link to="/new">
                                    <i className="fa fa-plus-square"></i> 
                                    <span className="nav-label">Создание карты</span>
                                </Link>
                            </li>,
                            <li key='nav-5' className="nav-item">
                                <a onClick={() => this.props.print(this.props.checkID)}>
                                    <i className="fa fa-print"></i>
                                    <span className="nav-label">Пeчать чека (*)</span>
                                </a>
                            </li>]
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.core.user,
        checkID: state.core.checkID,
        token: state.core.auth_token
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            print: checkPrint
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(Navigation);