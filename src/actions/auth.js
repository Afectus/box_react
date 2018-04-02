import apiClient from '../coreapi';
import cookie from 'react-cookies';

import history from '../functions/history';
import { authUserInfoDispatch, authErrorDispatch, authTokenDispatch, authLogoutDispatch } from './index';

// Авторизация из формы по логину и паролю
export const authForm = function(username, password) {

    return (dispatch) => {

        // Параметры запоса
        const params = {
            username: username,
            password: password
        }

        // Запрос
        apiClient.action(apiClient.schema, ["login", "create"], params).then((result) => {
            if(result['token']) {

                // Запись токена в хранилище и куки
                dispatch(authTokenDispatch(result['token']));
                cookie.save('auth_token', result['token'], { path: '/' });
                
                // Загрузить данные авторизованного пользователя
                dispatch(authUser(result['token']));
                
                // Переход на главную
                history.push('/')
            }
        }).catch(error => {
            
            // Обработка ошибок ***
        
        });
    }

}

// Загрузка данных об авторизованном пользователе
export const authUser = (token) => {
    return (dispatch) => {
        
        // Запрос
        apiClient.action(apiClient.schema, ["user", "list"], {token: token}).then(result => {
            
            // Запись полученных данных в хранилище
            dispatch(authUserInfoDispatch(result));
        
        }).catch(error => {
            
            // Данные не получены - удалить куки и переход на страницу авторизации
            dispatch(authErrorDispatch());
            cookie.remove('auth_token');
            
            history.push('/login');
        
        });
    }
}

// Авторизация по токену из куки
export const authTokenCookie = (token) => {
    return (dispatch) => {
        dispatch(authTokenDispatch(token));

        // Загрузка данных по токену
        dispatch(authUser(token));
    }
}

// Выход
export const authDelete = (token) => {
    return (dispatch) => {

        // Если передан токен
        if(token) {
            // Запрос на удаления токена
            apiClient.action(apiClient.schema, ["logout", "delete"], {token: token}).then(result => {       
                console.log('Logout');
            });
        }

        // удаление токена из куки и переход на страницу авторизации
        cookie.remove('auth_token');
        dispatch(authLogoutDispatch());
        history.push('/login');
    }
}