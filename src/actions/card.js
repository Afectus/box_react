import apiClient from '../coreapi';
import history from '../functions/history';
import toastr from 'toastr';

export const cardToEditDispatch = (data) => {
    return {
        type: 'CARD_EDIT',
        payload: data
    }
}

export const cardEditFail = () => {
    return {
        type: 'CARD_EDIT_FAIL',
        payload: true
    }
}

export const cardAddRelativeDispatch = () => {
    return {
        type: 'CARD_RELATIVE_ADD'
    }
}


export const cardRelativeDetailDispatch = (data) => {
    return {
        type: 'CARD_RELATIVE_DETAIL',
        payload: data
    }
}

export const cardRelativeUpdateDispatch = () => {
    return {
        type: 'CARD_RELATIVE_UPDATE'
    }
}

export const cardSearch = (by, value) => {
    return (dispatch) => {
        let params = {};
        params[by] = value;
        apiClient.action(apiClient.schema, ["buyer", "filter", "list"], params).then((result) => {
            if(result && result.length) {
                history.push('/search/' + by + '/' + value);
            }
        });
    }
}

export const cardNew = (params) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyer", "filter", "list"], {"phone": params.buyer.phone}).then((result) => {
            if(result && result.length) {
                history.push('/search/phone/' + params.buyer.phone);
            } else {
                apiClient.action(apiClient.schema, ["buyer", "filter", "list"], {"card": params.name}).then((result) => {
                    if(result && result.length) {
                        history.push('/search/card/' + params.name);
                    } else {
                        apiClient.action(apiClient.schema, ["discountcard", "add", "create"], params).then((result) => {
                            history.push('/search/card/' + result.name);
                        })
                    }
                });
            }
        });
    }
}

export const cardToEdit = (phone) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyer", "filter", "list"], {phone: phone}).then((result) => {
            if(result.length) {
                dispatch(cardToEditDispatch(result[0]));
            } else {
                dispatch(cardToEditDispatch('not found'));
            }
        });
    }
}

export const cardEdit = (params) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyer", "update", "update"], params).then((result) => {
            if(result.id) {
                history.push('/search/phone/' + result.phone);
                dispatch(cardToEditDispatch(result));
            } else {
                dispatch(cardEditFail());
            }
        });
    }
}

export const cardAddRelative = (params, cardPhone) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyerrel", "add", "create"], params).then((result) => {
            if(result.id) {
                dispatch(cardAddRelativeDispatch());
                history.push('/search/phone/' + cardPhone);
            }
        });
    }
}

export const cardRelativeDetail = (id, cardPhone) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyerrel", "detail", "read"], {id: id}).then((result) => {
            if(result.id) {
                dispatch(cardRelativeDetailDispatch(result));
            }
        }).catch(e => {
            // toastr.warning('Не найдено!');
            // history.push('/search/phone/' + cardPhone);
        });
    }
}

export const cardRelativeUpdate = (params, cardPhone) => {
    return (dispatch) => {
        apiClient.action(apiClient.schema, ["buyerrel", "update", "update"], params).then((result) => {
            if(result.id) {
                dispatch(cardRelativeUpdateDispatch());
                history.push('/search/phone/' + cardPhone);
            }
        });
    }
} 