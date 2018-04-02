import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';

import history from '../../functions/history';
import { authForm, authDelete } from '../../actions/auth';

import Main from '../layouts/Main';

class Login extends React.Component {

    state = {
        emptyUsername: false,
        emptyPassword: false,
        nonAuth: false
    }

    componentDidMount() {
        if(cookie.load('auth_token')) {
            history.push('/');
        }
    }

    handeAuth() {
        
        const username = this.username.value;
        const password = this.password.value;

        if(username.length && password.length) {
            this.props.auth(username, password);
            setTimeout(() => this.setState({nonAuth: true}), 500);
        } else {
            this.setState({emptyUsername: username.length ? false : true});
            this.setState({emptyPassword: password.length ? false : true});
        }
    }

    render() {
        return (
            <Main auth={false}>
                <div className="middle-box text-center loginscreen">
                    <div>
                        <h2>Касса</h2>
                        <p>Авторизуйтесь для дальнейшей работы.</p>
                        <div className="m-t">
                            <div className={'form-group ' + (this.state.emptyUsername || this.state.nonAuth ? 'has-error' : '')}>
                                <input 
                                    type="text" 
                                    onKeyPress={e => e.key === 'Enter' ? this.handeAuth() : false}
                                    ref={input => this.username = input} 
                                    className="form-control" 
                                    placeholder="Логин" 
                                />
                                {this.state.emptyUsername && <span className="help-block m-b-none">Введите логин!</span>}
                            </div>
                            <div className={'form-group ' + (this.state.emptyPassword || this.state.nonAuth ? 'has-error' : '')}>
                                <input 
                                    type="password" 
                                    onKeyPress={e => e.key === 'Enter' ? this.handeAuth() : false}
                                    ref={input => this.password = input} 
                                    className="form-control" 
                                    placeholder="Пароль" 
                                />
                                {this.state.emptyPassword && <span className="help-block m-b-none">Введите пароль!</span>}
                            </div>
                            {this.state.nonAuth && <span className="help-block m-b-2">Неправильный логин или пароль!</span>}
                            <button onClick={() => this.handeAuth()} className="btn btn-primary block full-width m-b">Вход</button>
                        </div>
                        <p className="m-t"> <small>Бабах &copy; 2018</small> </p>
                    </div>
                </div>
            </Main>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            auth: authForm,
            authDelete: authDelete
        },
        dispatch
    )
}

export default connect(null, matchDispatchToProps)(Login);