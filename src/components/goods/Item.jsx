import React from 'react';
import toastr from 'toastr';

import { goodsCount } from '../../functions';
import { NOT_IN_STOCK } from '../../settings/lang';

const Item = (props) => {
    function handleClick(item) {
        if(!goodsCount(item.goodsinstock_goods)) {
            toastr.options.progressBar = true;
            toastr.options.closeButton = true;
            toastr.warning(NOT_IN_STOCK);
        } else {
            props.onAddGood();
        }
    }
    return (
        <tr onClick={() => props.onChoose()}>
            <td>
                <button 
                    onClick={() => handleClick(props.item)} 
                    type="button" 
                    className={"btn btn-xs" + (goodsCount(props.item.goodsinstock_goods) ? ' btn-primary' : ' btn-danger')}
                >+</button>
            </td>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td>{props.item.gift ? <i className="fa fa-gift"></i> : props.item.price}</td>
        </tr>
    )
}

export default Item;