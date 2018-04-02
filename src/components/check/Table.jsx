import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Ibox from '../common/Ibox';
import CheckItem from './Item';
import { 
    ID,
    CHECK_ID,
    CHECK_NOT_CREATED,
    DISCOUNT_NAME,
    DISCOUNT_SUMM,
    COUNT_SH,
    COST_SH,
    GOOD_CODE, 
    GOOD_NAME, 
    GOOD_PRICE 
} from '../../settings/lang';

import { checkItemUpdate, checkItemDelete } from '../../actions/check';

class CheckTable extends React.Component {

    handleInputChange = (value, item) => {
        this.props.changeCount(item.id, value || 1, this.props.checkID);
    }

    handleDelete = (id) => {
        this.props.delete(id, this.props.checkID);
    }

    handleItemCountChange = (type, item) => {
        if(type === '+') {
            this.props.changeCount(item.id, ++item.col, this.props.checkID);
        } else if(type === '-') {
            this.props.changeCount(item.id, --item.col, this.props.checkID);
        }
    }

    render() {
        const data = this.props.goods.fcheck || [];
        return (
            <Ibox 
                title={CHECK_ID + ': ' + (this.props.checkID || CHECK_NOT_CREATED)}  
                tools={true} 
                loading={this.props.checkChange}
            >
                <div className="table-responsive max-height-300">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{ID}</th>
                                <th>{GOOD_CODE}</th>
                                <th>{GOOD_NAME}</th>
                                <th>{GOOD_PRICE}</th>
                                <th>{COUNT_SH}</th>
                                <th>{COST_SH}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.checkID ? 
                                data.map((item, index) => ([
                                    <CheckItem 
                                        key={'selected_goods_' + index} 
                                        item={item} 
                                        onInput={this.handleInputChange}
                                        onChange={this.handleItemCountChange}
                                        onDelete={this.handleDelete}
                                    />
                                    ,
                                    <tr key={'selected_goods_discount_' + index}>
                                        <td colSpan="7" className="align-middle">
                                            <div className="discount-good">
                                                <div className="row discount-line-title discount-line">
                                                    <div className="col-sm-5">{DISCOUNT_NAME}</div>
                                                    <div className="col-sm-7">{DISCOUNT_SUMM}</div>
                                                </div>
                                                {item.checkitem_checkitemd.length > 0 && item.checkitem_checkitemd.map((elem, i) => (
                                                    <div key={'discount-' + i} className="row discount-line">
                                                        <div className="col-sm-5">{elem.desc}</div>
                                                        <div className="col-sm-7">{(elem.value).toFixed(2)} р.</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ])) : <tr>
                                        <td colSpan="6">
                                            <div className="text-center m-t-sm">Чек не создан!</div>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </Ibox>
        )
    }
}

function mapStateToProps(state) {
    return {
        goods: state.goodsSelected,
        checkID: state.core.checkID,
        checkChange: state.core.isCheckChange
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeCount: checkItemUpdate,
            delete: checkItemDelete
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckTable);