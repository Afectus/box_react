import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkComeBack } from '../../actions/check';

import Ibox from '../common/Ibox';
import PaymentModal from './Modal';
import OpenCheck from '../modals/OpenCheck';

class TotalDiscount extends React.Component {

    handleCheck() {
        let id = this.checkID.value;
        this.props.comeback(id);
    }

    render() {
        const paymentMethods = {card: 'Безналичные', money: 'Наличные', bonus: 'Бонусы'}
        const payment = this.props.payment;
        return this.props.checkID ? 
            (<div>
                <Ibox title="Оплата" tools={true}>
                    <div className="payment">
                        {payment && payment.length ? (
                                payment.map((item, index) => (
                                    <div key={'payments-' + index}>
                                        <span><b>{paymentMethods[item.method]}: </b> {item.value} р.</span>
                                        {item.method === 'money' && 
                                            <span key="money-pay-input" className="m-l-xs"><b>Внесено: </b> {item.inputsum} р.</span>
                                        }
                                    </div>
                                ))
                            ) : <div className="text-center">Не определено</div>
                        }
                        <div className="text-center m-t-sm">
                            <button type="button" className="btn btn-w-m btn-success" data-toggle="modal" data-target="#payment">Оплата</button>
                        </div>
                    </div>
                </Ibox>
                <PaymentModal 
                    id="payment"
                    pay={this.props.payment}
                    updating={this.props.change}
                    total={this.props.sumtotal}
                />
                <OpenCheck id="check-id" checkRef={el => this.checkID = el} onCheck={() => this.handleCheck()} />
            </div>) : null
    }
}

function mapStateToProps(state) {
    return {
        checkID: state.core.checkID,
        payment: state.goodsSelected.check_pay
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            comeback: checkComeBack
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(TotalDiscount);