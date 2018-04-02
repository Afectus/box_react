import { combineReducers } from 'redux';

function core(state = {}, action) {
    switch(action.type) {

        case 'GOODS_LOADED': 
            return Object.assign({}, state, {isGoodsLoaded: true});

        case 'CHOOSE_GOOD':
            return Object.assign({}, state, {choosedGood: action.payload});
        
        case 'AUTH_USER':
            return Object.assign({}, state, {user: action.payload});

        case 'AUTH_ERROR':
            return Object.assign({}, state, {auth_token: null});
        
        case 'AUTH_TOKEN':
            return Object.assign({}, state, {auth_token: action.payload});

        case 'AUTH_LOGOUT': 
            return Object.assign({}, state, {auth_token: null, user: null});

        case 'CHECK_ID':
            return Object.assign({}, state, {checkID: action.payload, checkValid: false});
        
        case 'CHECK_RESET':
            return Object.assign({}, state, {checkID: null});
        
        case 'CHECK_VALID':
            return Object.assign({}, state, {checkValid: true});

        case 'CHECK_CHANGE':
            return Object.assign({}, state, {isCheckChange: action.payload});

        case 'SELECT_BUYER':
            return Object.assign({}, state, {buyer: action.payload});

        case 'CARD_EDIT':
            return Object.assign({}, state, {card: action.payload});

        case 'CARD_RELATIVE_DETAIL':
            return Object.assign({}, state, {cardRelative: action.payload});

        case 'CARD_EDIT_FAIL':
            return Object.assign({}, state, {card: {fail: action.payload}});

        case 'CHECK_BUYER_RESET':
            return Object.assign({}, state, {buyer: null});



        case 'DEBUG':
            return Object.assign({}, state, {debug: action.payload});
        case 'DEBUG_CLEAR':
            return Object.assign({}, state, {debugData: null});        
        case 'CHECK_VALID_DEBUG':
            return Object.assign({}, state, {checkValid: true, debugData: action.payload});
        case 'CHECK_TEST':
        case 'CHECK_RECALC':
        case 'CHECK_CREATE_DEBUG':
        case 'CHECK_DETAIL_DEBUG':
        case 'DEBUG_API_SCHEMA':
            return Object.assign({}, state, {debugData: action.payload});

        default:
            return state;

    }
}

function goodsData(state = [], action) {
    switch(action.type) {

        case "GOODS_LIST":
            return action.payload;

        default: 
            return state;
    }
}

function goodsTax(state = [], action) {
    switch(action.type) {

        case 'GOODS_TAX': 
            return action.payload;

        default:
            return state;

    }
}

function goodsSelected(state = [], action) {
    switch(action.type) {
        
        case 'CHECK_DETAIL':
            return action.payload;

        case 'CHECK_RESET':
            return [];

        default:
            return state;

    }
}

export default combineReducers({
    goodsSelected,
    goodsData,
    goodsTax,
    core
});