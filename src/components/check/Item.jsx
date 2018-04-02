import React from 'react';
import toastr from 'toastr';
import { debounce } from 'lodash';

import Input from '../common/Input';
import { goodsCount } from '../../functions/index';
import { 
    MESS_GOODS_COUNT,
    MESS_GOODS_IN_STOCK
} from '../../settings/lang';

class Item extends React.Component {

    state = {
        value: ''
    }

    delayedCall = debounce((value) => {
        
        let item = this.props.item;
        let count = value <= goodsCount(item.goods.goodsinstock_goods) ? value : goodsCount(item.goods.goodsinstock_goods);
        
        if(count !== '' && Number(count) > 0) {
            this.setState({value: count});
            this.props.onInput(count, item);
        } else {
            this.setState({value: 1});
            this.props.onInput(1, this.props.item);
            toastr.warning(MESS_GOODS_COUNT);
        } 

        if(Number(value) > goodsCount(item.goods.goodsinstock_goods)) {
            toastr.warning(MESS_GOODS_IN_STOCK + count);
        }

    }, 500);

    handleChange = (e) => {
        this.setState({value: e.target.value});
        this.delayedCall(e.target.value);
    }

    handleChangeCount = (type) => {
        const value = Number(this.state.value || this.props.item.col);
        this.setState({value: type === '+' ? value + 1 : value - 1});
        this.props.onChange(type, this.props.item);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.item) {
            this.setState({value: nextProps.item.col});
        }
    }

    render() {
        const { item } = this.props;
        const { barcodelist_goods } = item.goods;
        return (
            <tr>
                <td>{item.goods.id}</td>
                <td>
                    {barcodelist_goods.map(elem => (
                        <div key={'i-' + item.id + '-b-' + elem.barcode}>{elem.barcode}</div>
                    ))}
                </td>
                <td>{item.goods.name}</td>
                <td>
                    {!item.goods.gift ? (item.price + 'р.') : (<i className="fa fa-gift"></i>)}
                </td>
                <td>
                    <div className="input-group goods-col">
                        <div className="input-group-btn">
                            <button type="button" 
                                tabIndex="-1"
                                onClick={() => this.handleChangeCount('-')} 
                                className="btn btn-white btn-sm"
                                disabled={item.col === 1 ? true : false}
                            >-</button>
                        </div>
                        <Input 
                            type="text" 
                            tabIndex="-1"
                            placeholder={item.col} 
                            value={this.state.value}
                            className="form-control input-sm"
                            onChange={(e) => {this.handleChange(e)}}
                        />
                        <div className="input-group-btn">
                            <button type="button" 
                                tabIndex="-1"
                                onClick={() => this.handleChangeCount('+')} 
                                className="btn btn-white btn-sm"
                                disabled={item.col < (goodsCount(item.goods.goodsinstock_goods)) ? false : true}
                            >+</button>
                        </div>
                    </div>
                </td>
                <td>{item.sum} р.</td>
                <td>
                    <button type="button" 
                        onClick={() => this.props.onDelete(item.id)}
                        className="btn btn-danger btn-sm">
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default Item;