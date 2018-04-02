import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../functions/history';
import { checkBuyerReset } from '../actions/check';

import Ibox from './common/Ibox';

class InfoPanel extends React.Component {
    
    handleChangeBuyer() {
        this.props.checkBuyerReset(this.props.checkID)
    }

    handleEditBuyer() {
        history.push('/card/' + this.props.buyer.phone);
    }

    render() {
        let paymentReturn = '0';
        if(this.props.payment) {
            this.props.payment.forEach(elem => {
                if(elem.method === 'money') {
                    paymentReturn = elem.returnsum;
                }
            });
        }
        let cost = this.props.cost || 0;
        //let checkDiscount = this.props.checkDiscount || 0;
        let checkCost = this.props.checkCost || 0;
        let checkDiscountPercent = ((this.props.checkDiscount*100)/cost) || 0;
        return (
            <div className="row">
                <div className="col-md-4">
                    <Ibox title="Сумма">
                        <h1 className="no-margins">{(checkCost).toFixed(2)}</h1>
                        <div className="stat-percent font-bold text-success">Скидка: {(checkDiscountPercent).toFixed(2)}%</div>
                        <small>Без скидки: {cost}р.</small>
                    </Ibox>
                </div>
                <div className="col-md-4">
                    <Ibox title="Сдача">
                        <h1 className="no-margins">{paymentReturn} р.</h1>
                        <div className="stat-percent font-bold text-success"></div>
                        <small></small>
                    </Ibox>
                </div>  
                <div className="col-md-4">
                    <Ibox title="Покупатель">
                        {this.props.buyer && 
                            <div>
                                <div><strong>ФИО:</strong> {this.props.buyer.f} {this.props.buyer.i} {this.props.buyer.o}</div>
                                <div><strong>Бонусы:</strong> {this.props.buyer.bonus}р.</div>
                                <div className="text-center m-t-xs">
                                    <button 
                                        onClick={() => this.handleChangeBuyer()}
                                        type="button" 
                                        className="btn btn-danger btn-xs m-r-xs"
                                    >Сброс клиента</button>
                                    <button 
                                        onClick={() => this.handleEditBuyer()}
                                        type="button" 
                                        className="btn btn-default btn-xs"
                                    >Редактировать</button>
                                </div>
                            </div>
                        }
                        {!this.props.buyer && 
                            <div className="text-center">Покупатель не выбран</div>
                        }
                    </Ibox>
                </div>              
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        checkID: state.core.checkID,
        buyer: state.core.buyer,
        cost: state.goodsSelected.sum,
        checkDiscount: state.goodsSelected.sumdiscount,
        checkCost: state.goodsSelected.sumtotal,
        payment: state.goodsSelected.check_pay
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            checkBuyerReset: checkBuyerReset
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(InfoPanel);