import React, { Component}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { cardNew } from '../../actions/card';

import Ibox from '../common/Ibox';
import Main from '../layouts/Main';
import { 
    CREATE_NEW_CARD, 
    CASHER, 
    FIRST_NAME,
    LAST_NAME,
    NAME,
    CARD_NUMBER,
    GENDER,
    CHOOSE_GENDER,
    FEMALE,
    MALE,
    PHONE_MASK,
    PHONE_NUMBER,
    BIRTHDAY,
    SUBSCRIBE_AGREEMENT,
    WRITE
} from '../../settings/lang';

class NewCard extends Component {

    state = {
        phoneValidate: true,
        formValidate: true,
        genderValue: 'none',
        bDayValidate: true
    }
    
    handleGenderChange(event) {
        this.setState({genderValue: event.target.value});
    }

    handlePhoneInput(event) {
        if((!this.phone.value.match(/[9]\d{9}/g) || this.phone.value.length > 10) && this.state.phoneValidate) {
            this.setState({phoneValidate: false});
        } else if(this.phone.value.match(/[9]\d{9}/g) && this.phone.value.length <= 10 && !this.state.phoneValidate) {
            this.setState({phoneValidate: true});
        }
    }

    handleNewClient() {

        let surname = this.surname;
        let name = this.name;
        let phone = this.phone;
        let birthday = this.bday.value || null;
        let gender = this.state.genderValue;
        let card = this.cardNumber.value;
        let patronymic = this.patronymic.value;
        
        this.setState({bDayValidate: birthday || false});

        if(surname.value.length && name.value.length && (phone.value.length && this.state.phoneValidate) && 
            card.length && (birthday && birthday.length)) 
        {

            let params = {
                name: card,
                buyer: {
                    phone: phone.value,
                    f: surname.value,
                    i: name.value,
                    o: patronymic,
                    bday: birthday,
                    adv: this.adv.checked
                }
            };
            
            if(gender !== 'none' && gender.length) params.sex = gender;

            this.props.new(params);
            
        } else {
            
            this.setState({formValidate: false});
        
        }
    }

    render() {
        let errorClass = ' has-error';
        return (
            <Main>
                <br />
                <Ibox title={CREATE_NEW_CARD}>
                    <div>
                        {/* Кассир */}
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="kassir">{CASHER}</label>
                                <input type="text" className="form-control" id="kassir" />
                            </div>
                        </div>

                        {/* Группа ввода */}
                        <div className="row">
                            
                            {/* Фамилия */}
                            <div className={"form-group col-md-4" + (!this.state.formValidate && !this.surname.value.length ? errorClass : '')}>
                                <label htmlFor="clientSurname">* {FIRST_NAME}</label>
                                <input type="text" 
                                    className="form-control"
                                    id="clientSurname" 
                                    ref={input => this.surname = input} 
                                />
                            </div>
                            
                            {/* Имя */}
                            <div className={"form-group col-md-4" + (!this.state.formValidate && !this.name.value.length ? errorClass : '')}>
                                <label htmlFor="clientName">* {NAME}</label>
                                <input type="text" 
                                    className="form-control"
                                    id="clientName" 
                                    ref={input => this.name = input} 
                                />
                            </div>

                            {/* Отчество */}
                            <div className="form-group col-md-4">                       
                                <label htmlFor="clientPatronymic">{LAST_NAME}</label>
                                <input type="text" 
                                    className="form-control"
                                    id="clientPatronymic"  
                                    ref={input => this.patronymic = input} 
                                />
                            </div>

                        </div>

                        {/* Группа ввода */}
                        <div className="row">

                            {/* Номер телефона */}
                            <div 
                                className={
                                    "form-group col-md-4" + 
                                    (((!this.state.formValidate && this.phone.value.length !== 10) || !this.state.phoneValidate) ? errorClass : '')
                                }
                            >
                                <label htmlFor="phoneNumber">* {PHONE_NUMBER}</label>
                                <input type="tel" 
                                    className="form-control"
                                    maxLength={10}
                                    id="PhoneNumber"
                                    onChange={() => this.handlePhoneInput()}
                                    ref={input => this.phone = input} 
                                />
                                <small id="phoneHelpBlock" className="form-text text-muted">{PHONE_MASK}</small>
                            </div>

                            {/* Дата рождения */}
                            <div className={"form-group col-md-4" + ((!this.state.formValidate && !this.state.bDayValidate ) ? errorClass : '')}>
                                <label htmlFor="clientBithday">* {BIRTHDAY}</label>
                                <input type="date" 
                                    className="form-control"
                                    id="clientBirthday" 
                                    ref={input => this.bday = input} 
                                />
                            </div>

                            {/* Пол */}
                            <div className="form-group col-md-4">                           
                                <label htmlFor="clientGender">{GENDER}</label>
                                <select 
                                    value={this.state.genderValue} 
                                    onChange={() => this.handleGenderChange} 
                                    className="form-control" 
                                    id="clientGender"
                                >
                                    <option value="none">{CHOOSE_GENDER}</option>
                                    <option value="male">{MALE}</option>
                                    <option value="female">{FEMALE}</option>
                                </select>
                            </div>

                        </div>

                        {/* Номер карты */}
                        <div className="row">
                            <div className={"form-group col-md-12" + (!this.state.formValidate && !this.cardNumber.value.length ? errorClass : '')}>
                                <label htmlFor="cardNumber">* {CARD_NUMBER}</label>
                                <input type="text" 
                                    className="form-control"
                                    id="cardNumber" 
                                    ref={input => this.cardNumber = input} 
                                />
                            </div>
                        </div>

                        {/* Согласие на рассылку */}

                        <div className="form-group">
                            <div className="checkbox checkbox-inline checkbox-primary">
                                <input 
                                    id="adv"
                                    name="adv"
                                    type="checkbox"
                                    ref={input => this.adv = input}
                                />
                                <label htmlFor="adv">{SUBSCRIBE_AGREEMENT}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-12">
                                <button type="submit" className="btn btn-primary" onClick={() => this.handleNewClient()}>{WRITE}</button>
                            </div>
                        </div>
                    </div>
                </Ibox>
            </Main>
        )
    }
}

function mapStateToProps(state) {
    return {
        check: state.core.checkID 
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            new: cardNew
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(NewCard);