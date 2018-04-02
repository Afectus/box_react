
// Функция генерирует случайный ID для создания соединения с socket.io
export function makeID() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;
}

// Функция определяет кол-во товара в складах
// @items - массив
export function goodsCount(items) {
    let count = 0;
    items.forEach(elem => {
        count += elem.value;
    });
    return count;
}

// Функция сортирует массив с Категориями товаров - для дальнейшей удобной работы
// @tax - массив 
export const sort = (tax) => {
    let arr = [];
    tax.forEach(item => {
        if(!item.parent) {
            arr.push([{label: item.name, value: item.id, group: true}]);
        }
    });
    arr.forEach((item, index) => {
        tax.forEach(elem => {
            if(elem.parent && elem.parent === item[0].value) {
                arr[index].push({label: elem.name, value: elem.id});
            }
        })
    });
    return arr;
}