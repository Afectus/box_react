import apiClient from '../coreapi';
import cookie from 'react-cookies';
import toastr from 'toastr';
import io from 'socket.io-client';

import { makeID } from '../functions';

export const newCheckDispatch = (id) => {
    return {
        type: 'CHECK_ID',
        payload: id
    }
}

export const validCheckDispatch = () => {
    return {
        type: 'CHECK_VALID'
    }
}

export const checkDetailDispatch = (data) => {
    return {
        type: 'CHECK_DETAIL',
        payload: data
    }
}

// Выбор клиента
export const selectBuyerDispatch = (client) => {
    return {
        type: 'SELECT_BUYER',
        payload: client
    }
}

export const checkBuyerResetDispatch = () => {
    return {
        type: 'CHECK_BUYER_RESET'
    }
}

export const checkNewItemDispatch = () => {
    return {
        type: 'CHECK_NEW_ITEM'
    }
}

export const checkItemUpdateDispatch = () => {
    return {
        type: 'CHECK_ITEM_UPDATE_COUNT'
    }
}

export const checkItemDeleteDispatch = () => {
    return {
        type: 'CHECK_ITEM_DELETE'
    }
}

export const checkResetDispatch = () => {
    return {
        type: 'CHECK_RESET'
    }
}

export const checkPayDispatch = () => {
    return {
        type: 'CHECK_PAY'
    }
}

export const checkChange = (status) => {
    return {
        type: 'CHECK_CHANGE',
        payload: status
    }
}

export const checkUpdateDispatch = () => {
    return {
        type: 'CHECK_UPDATE'
    }
}

// Создать новый чек
export const newCheck = (buyer) => {
    return (dispatch) => {
        const params = {buyer: (buyer ? buyer : null)};
        apiClient.action(apiClient.schema, ["check", "add", "create"], params).then((result) => {
            
            dispatch(checkDebugData('CHECK_CREATE_DEBUG', result));
            dispatch(newCheckDispatch(result.id));
            cookie.save('check_id', result.id);
            dispatch(checkDetail(result.id));
        
        });
    }
}

// Загрузка ID чека из Cookie
export const cookieCheck = (id) => {
    return (dispatch) => {
        dispatch(newCheckDispatch(id));
        dispatch(checkDetail(id));
    }
}

// Подтвердить чек
export const checkValid = (id) => {
    return (dispatch) => {
        const params = {id: id, process: 'valid'};
        apiClient.action(apiClient.schema, ["check", "update", "update"], params).then((result) => {
            dispatch(checkDebugData('CHECK_VALID_DEBUG', result));
            dispatch(validCheckDispatch());
        });
    }
}

// Get Check Details
export const checkDetail = (id) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["check", "detail", "read"], {id: id}).then((data) => {
            dispatch(checkDetailDispatch(data));
            if(data.buyer) {
                dispatch(checkBuyer(data.buyer));
            }
            dispatch(checkChange(false));
        });
    }
}

// GET check buyer
export const checkBuyer = (id) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyer", "detail", "read"], {id: id}).then(function(result) {
            dispatch(selectBuyerDispatch(result));
        });
    }
}

// Обновить чек
export const checkUpdate = (checkId) => {
    return (dispatch) => {
        const params = {id: checkId, process: 'recalc'}
        apiClient.action(apiClient.schema, ["check", "update", "update"], params).then((data) => {
            dispatch(checkUpdateDispatch());
            dispatch(checkDetail(checkId));
        });
    }
}

// Привязать чек к другому клиенту (покупателю)
export const checkNewBuyer = (checkId, userId) => {
    return (dispatch) => {
        dispatch(checkChange(true));
        const params = {id: checkId, buyer: userId, process: 'setbuyer'};
        apiClient.action(apiClient.schema, ["check", "update", "update"], params).then(function(result) {
            dispatch(checkUpdate(checkId));
        });
    }
}

// Сменить покупателя
export const changeBuyer = (client, checkId) => {
    return (dispatch) => {
        dispatch(selectBuyerDispatch(client));
        if(checkId) {
            dispatch(checkNewBuyer(checkId, client.id));
        }
    }
}

// Сброс покупателя
export const checkBuyerReset = (checkId) => {
    return (dispatch) => {
        dispatch(checkNewBuyer(checkId, null));
        dispatch(checkBuyerResetDispatch());
    }
}

// Add new item to check
export const checkNewItem = (checkId, item) => {
    return (dispatch) => {
        dispatch(checkChange(true));
        const params = {fcheck: checkId, goods: item.id, col: 1};
        apiClient.action(apiClient.schema, ["checkitem", "create"], params).then((data) => {

            dispatch(checkNewItemDispatch());
            dispatch(checkUpdate(checkId));

            // dispatch(checkUpdate(checkId));
            // if(data.goods[0]) dispatch(notification('all', data.goods[0]));
            // if(data.fcheck[0]) dispatch(notification('all', data.fcheck[0]));
        });
    }
}

export const checkItemUpdate = (checkItemId, count, checkId) => {
    return (dispatch) => {
        dispatch(checkChange(true));
        const params = {id: checkItemId, col: count};
        apiClient.action(apiClient.schema, ["checkitem", "update", "update"], params).then((data) => {
            dispatch(checkItemUpdateDispatch());
            dispatch(checkUpdate(checkId));
        });
    }
}

export const checkItemDelete = (id, checkId) => {
    return (dispatch) => {
        dispatch(checkChange(true));
        apiClient.action(apiClient.schema, ["checkitem", "update", "delete"], {id: id}).then((data) => {
            dispatch(checkItemDeleteDispatch());
            dispatch(checkUpdate(checkId));
        });
    }
}

export const checkReset = () => {
    return (dispatch) => {
        dispatch(checkResetDispatch());
        cookie.remove('check_id');
    }
}

export const checkPay = (checkId, method, value, input) => {
    return (dispatch) => {
        dispatch(checkChange(true));
        const params = {fcheck: checkId, method: method, value: value, inputsum: input || 0};
        apiClient.action(apiClient.schema, ["checkpay", "create"], params).then((result) => {
            dispatch(checkPayDispatch());
        });
    }
}

export const checkPrint = (id) => {
    
    toastr.options = {
        progressBar: true,
        closeButton: true
    }

    return (dispatch) => {
        if(id) {
            const socket = io.connect('http://box.babah24.ru:3000');
    
            //если сокет подключен то выполняем код
            if(socket) {
        
                socket.on('connect', () => {
                    toastr.info("Connect to server socket.io");
                    socket.emit('myauth', { 'name': clientid });
                });
                
                socket.on('disconnect', () => {
                    toastr.warning("Disconnect from server socket.io");
                });

                socket.on('myauth', (data) => {
                    toastr.info(String(data));
                });
                
                socket.on('res', (data) => {
                    toastr.res(String(data));
                });

                socket.on('info', function (data){
                    toastr.info(String(data));
                });
                
                let clientid = makeID();
                socket.emit('print', { 'clientid': clientid, 'name': 'kkm', 'check__id': id });         
                toastr.info('Print Check');
            };
        
        } else {
            toastr.warning('Создайте чек!');
        }
    }
}


/* Dev - Debug */ 
export const checkTest = (checkId) => {
    return (dispatch) => {
        const params = {id: checkId, process: 'test'}
        apiClient.action(apiClient.schema, ["check", "update", "update"], params).then((data) => {
            dispatch(checkDebugData('CHECK_TEST', data));
            dispatch(checkDetail(checkId));
        });
    }
}

export const checkRecalc = (checkId) => {
    return (dispatch) => {
        const params = {id: checkId, process: 'recalc'}
        apiClient.action(apiClient.schema, ["check", "update", "update"], params).then((data) => {
            dispatch(checkDebugData('CHECK_RECALC', data));
            dispatch(checkDetail(checkId));
        });
    }
}

export const checkComeBack = (id) => {
    return (dispatch) => {
        dispatch(checkDetail(id));
        dispatch(newCheckDispatch(id));
        if(id) cookie.save('check_id', id);
    }
}

export const checkDebug = (status) => {
    return (dispatch) => {
        dispatch(checkDebugData('DEBUG', status));
        cookie.save('debug', status, {path: '/'});
    }
}

export const checkDebugData = (action, payload) => {
    return {
        type: action,
        payload: payload
    }
}

export const checkDebugClear = () => {
    return (dispatch) => {
        dispatch(checkDebugData('DEBUG_CLEAR', ''));
    }
}

export const checkGetInfo = (id) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["check", "detail", "read"], {id: id}).then((data) => {
            dispatch(checkDebugData('CHECK_DETAIL_DEBUG', data));
        });
    }
}

export const coreapiSchema = () => {
    return (dispatch) => {
        dispatch(checkDebugData('DEBUG_API_SCHEMA', apiClient.schema));
    }
}