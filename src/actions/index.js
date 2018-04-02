// Запись информации об авторизованном пользователе в хранилище
export const authUserInfoDispatch = (data) => {
    return {
        type: 'AUTH_USER',
        payload: data
    }
}

// Авторизация не удалась
export const authErrorDispatch = () => {
    return {
        type: 'AUTH_ERROR'
    }
}

// Запись токена авторизации в хранилище
export const authTokenDispatch = (token) => {
    return {
        type: 'AUTH_TOKEN',
        payload: token
    }
}

// Выход
export const authLogoutDispatch = (token) => {
    return {
        type: 'AUTH_LOGOUT',
    }
}

// Запист загруженного списока товаров в хранилище
export const goodsListDispatch = (data) => {
    return {
        type: "GOODS_LIST",
        payload: data
    }
}

// Загружен список товаров
export const goodsLoadedDispatch = () => {
    return {
        type: 'GOODS_LOADED'
    }
}

// Запись списока категорий товаров в хранилище
export const goodsTaxDispatch = (data) => {
    return {
        type: 'GOODS_TAX',
        payload: data
    }
}

// Запись информации о выбранном товаре в хранилище
export const chooseGoodDispatch = (item) => {
    return {
        type: 'CHOOSE_GOOD',
        payload: item
    }
} 


/* Another actions */

export const chooseGood = (item) => {
    return (dispatch) => {
        dispatch(chooseGoodDispatch(item))
    }
}