import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkPay, checkUpdate } from '../../actions/check';
import Keyboard from './Keyboard';

class PaymentModal extends React.Component {
    state = {
        cardValue: '0',
        moneyValue: '0',
        moneyReturn: '0',
        moneyInput: '0',
        bonusValue: '0',
        focusOn: 'moneyValue',
        error: false
    }

    componentWillReceiveProps(nextProps) {
        let pay = {};
        if (nextProps.pay) nextProps.pay.map(item => pay[item.method] = item);
        this.setState({
            moneyValue: pay['money'] ? pay['money'].value : nextProps.total || '0',
            moneyInput: pay['money'] ? pay['money'].inputsum : '0',
            moneyReturn: pay['money'] ? pay['money'].returnsum : '0',
            cardValue: pay['card'] ? pay['card'].value  : '0',
            bonusValue: pay['bonus'] ? pay['bonus'].value  : '0'
        });
    }

    handleChangeMoney(e) {
        this.setState({moneyValue: e.target.value});
    }

    handleChangeMoneyInput(e) {
        this.setState({moneyInput: e.target.value});
    }

    handleChangeCard(e) {
        this.setState({cardValue: e.target.value});
    }

    handleChangeBonus(e) {
        this.setState({bonusValue: e.target.value});
    }

    handlePaySet() {

        const money = Number(this.state.moneyValue);
        const moneyInput = Number(this.state.moneyInput);
        const card = Number(this.state.cardValue);
        const bonus = Number(this.state.bonusValue);

        if(money <= moneyInput) {
            if(this.state.error) this.setState({error: false});
            if(money || moneyInput) this.props.checkPay(this.props.checkID, 'money', money, moneyInput);
            if(card) this.props.checkPay(this.props.checkID, 'card', card);
            if(bonus) this.props.checkPay(this.props.checkID, 'bonus', bonus);

            this.props.checkUpdate(this.props.checkID);
        } else {
            this.setState({error: true});
        }
    }

    handleChangePay(value, cut) {
        let focusOn = this.state.focusOn;
        if(focusOn === 'moneyValue') {
            this.moneyValue.focus();
        } else if(focusOn === 'moneyInput') {
            this.moneyInput.focus();
        } else if(focusOn === 'cardValue') {
            this.cardValue.focus();
        } else if(focusOn === 'bonusValue') {
            this.bonusValue.focus();
        }
        
        let stateValue = this.state[this.state.focusOn];

        if(cut) {
            if(typeof stateValue === 'number') {
                stateValue = stateValue.toString()
            }
            this.setState({
                [this.state.focusOn]: stateValue.length ? stateValue.substr(0, stateValue.length - 1) : ''
            });
        } else {
            if(typeof stateValue === 'string' && value === '.' && stateValue.indexOf('.') >= 0) {
                value = '';
            }
            this.setState({
                [this.state.focusOn]: stateValue + value
            });
        }
    }

    handleFocus(e) {
        this.setState({focusOn: e.target.name});
    }

    render() { 
        let pay = {};
        if(this.props.pay) this.props.pay.map(item => pay[item.method] = item);
        return (
            <div 
                className="modal fade" 
                id={this.props.id} 
                tabIndex="-1" 
                aria-hidden="true" 
                style={{display: "none"}}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">Всего к оплате: {this.props.total || '0'} р.</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group row">
                                        <div className="col-sm-6"></div>
                                        <label className="col-sm-3 col-form-label">Внесено</label>
                                        <label className="col-sm-3 col-form-label">Сдача</label>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputMoney" className="col-sm-3 col-form-label">Наличные</label>
                                        <div className={"col-sm-3" + (this.state.error ? ' has-error' : '')}>
                                            <input type="text"
                                                value={this.state.moneyValue}
                                                name="moneyValue"
                                                onFocus={this.handleFocus.bind(this)}
                                                onChange={this.handleChangeMoney.bind(this)}
                                                className="form-control"
                                                id="inputMoney"
                                                ref={e => this.moneyValue = e}
                                            />
                                        </div>
                                        <div className={"col-sm-3" + (this.state.error ? ' has-error' : '')}>
                                            <input type="text"
                                                value={this.state.moneyInput}
                                                name="moneyInput"
                                                onFocus={this.handleFocus.bind(this)}
                                                onChange={this.handleChangeMoneyInput.bind(this)}
                                                className="form-control"
                                                ref={e => this.moneyInput = e}
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text"
                                                placeholder={this.state.moneyReturn}
                                                className="form-control"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputCard" className="col-sm-3 col-form-label">Безналичные</label>
                                        <div className="col-sm-3">
                                            <input type="text" 
                                                value={this.state.cardValue}
                                                name="cardValue"
                                                onFocus={this.handleFocus.bind(this)}
                                                onChange={this.handleChangeCard.bind(this)}
                                                className="form-control" 
                                                id="inputCard"
                                                ref={e => this.cardValue = e}
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text"
                                                placeholder={pay['card'] ? pay['card'].inputsum : '0'}
                                                disabled={true}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text" 
                                                placeholder={pay['card'] ? pay['card'].returnsum : '0'}
                                                disabled={true}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputBonus" className="col-sm-3 col-form-label">Бонусы</label>
                                        <div className="col-sm-3">
                                            <input type="text" 
                                                value={this.state.bonusValue}
                                                name="bonusValue"
                                                onFocus={this.handleFocus.bind(this)}
                                                onChange={this.handleChangeBonus.bind(this)}
                                                className="form-control" 
                                                id="inputBonus"
                                                ref={e => this.bonusValue = e}
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text" 
                                                placeholder={pay['bonus'] ? pay['bonus'].inputsum : '0'}
                                                disabled={true}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text" 
                                                placeholder={pay['bonus'] ? pay['bonus'].returnsum : '0'}
                                                disabled={true}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    {this.state.error &&
                                        <div className="text-danger">
                                            Внесенная сумма должна быть больше или равна сумме к оплате.
                                        </div>
                                    }
                                </div>
                                <div className="col-md-4">
                                    <Keyboard 
                                        onChange={e => this.handleChangePay(e)}
                                        onCut={() => this.handleChangePay(null, true)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={() => this.handlePaySet()}
                                disabled={this.props.updating}
                            >Применить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        checkID: state.core.checkID,
        pay: state.goodsSelected.check_pay,
        total: state.goodsSelected.sumtotal,
        updating: state.core.isCheckChange
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            checkPay: checkPay,
            checkUpdate: checkUpdate
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(PaymentModal);