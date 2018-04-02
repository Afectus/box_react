import apiClient, { newApiClient } from '../coreapi';
import history from '../functions/history';
import cookie from 'react-cookies';

import { goodsListDispatch, goodsLoadedDispatch, goodsTaxDispatch } from './index';

// Загрузка списка товаров 
export const loadGoodsList = (token) => {
    return (dispatch) => {

        let authApiClient = newApiClient(token);

        authApiClient.action(apiClient.schema, ["goods", "list", "list"]).then(goods => {

            dispatch(goodsListDispatch(goods));   
            dispatch(goodsLoadedDispatch());
        
        }).catch(error => {
            
            cookie.remove('auth_token');
            history.push('/');

        });
    }
}

export const loadGoodsTax = (token) => {
    return (dispatch) => {

        let authApiClient = newApiClient(token);

        authApiClient.action(apiClient.schema, ["tax", "list"]).then(tax => {
            
            dispatch(goodsTaxDispatch(tax));
        
        }).catch(error => {
        
            // dispatch(fetchTaxError());
        
        });
    }
}