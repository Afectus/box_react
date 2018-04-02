import React, { Component}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { cardToEdit, cardEdit } from '../../actions/card';

import Ibox from '../common/Ibox';
import Main from '../layouts/Main';

import { 
    SAVED,
    ERROR,
    SAVE,
    NOT_FOUND,
    PHONE_MASK,
    SUBSCRIBE_AGREEMENT,
    EDIT,
    NAME,
    FIRST_NAME,
    LAST_NAME,
    GENDER,
    MALE,
    FEMALE,
    PHONE_NUMBER,
    SEE_HERE,
    PHONE_USED,
    CHOOSE_GENDER,
    BIRTHDAY
 } from '../../settings/lang';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edited: false,
            isNotFount: false,
            isLoaded: false,
            id: null,
            phone: '',
            f: '',
            i: '',
            o: '',
            bday: '', 
            sex: 'none',
            adv: false,
            phoneValidate: true,
            phoneUnique: true,
            formValidate: true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    

    componentDidMount(){
        const { phone, saved } = this.props.match.params;
        if(phone) {
            this.props.cardToEdit(phone);
        }
        if(saved) {
            this.setState({edited: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.card && nextProps.card !== 'not found' && !nextProps.card.fail) {

            this.setState({
                isLoaded: true,
                id: nextProps.card.id,
                phone: nextProps.card.phone,
                f: nextProps.card.f,
                i: nextProps.card.i,
                o: nextProps.card.o,
                bday: nextProps.card.bday,
                sex: nextProps.card.sex,
                adv: nextProps.card.adv
            });

        } else if(nextProps.card && nextProps.card.fail) {
            this.setState({phoneUnique: false});
        } else if (nextProps.card === 'not found') {
            this.setState({isNotFount: true});
        }
        const { saved } = this.props.match.params;
        this.setState({edited: saved ? true : false, isLoaded: true});
        
    }
    
    handleGenderChange(event) {
        this.setState({genderValue: event.target.value});
    }

    handlePhoneInput(e) {
        let phone = e.target.value;
        if((!phone.match(/[9]\d{9}/g) || phone.length > 10) && this.state.phoneValidate) {
            this.setState({phoneValidate: false, edited: false});
        } else if(phone.match(/[9]\d{9}/g) && phone.length <= 10 && !this.state.phoneValidate) {
            this.setState({phoneValidate: true});
        }
    }

    handleEdit() {

        let surname = this.state.f;
        let name = this.state.i;
        let phone = this.state.phone;
        let birthday = this.bday.value || this.state.bday || '';
        let gender = this.state.sex;
        let patronymic = this.state.o;

        if(surname.length && name.length && (phone.length && this.state.phoneValidate) && birthday.length) {

            let params = {
                id: this.state.id,
                phone: phone,
                f: surname,
                i: name,
                o: patronymic,
                bday: birthday,
                adv: this.state.adv
            };
            
            if(gender !== 'none' && gender.length) params.sex = gender;
            
            this.props.cardEdit(params);

        } else {
            
            this.setState({formValidate: false});
        
        }   
    }

    handleChange(e) {
        if(e.target.type === 'checkbox') {
            this.setState({[e.target.name]: !this.state.adv});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
        if(e.target.name === 'phone') this.handlePhoneInput(e);
        this.setState({edited: false});
    }

    handleBDayFocus(e) {
        e.currentTarget.type = "date";
    }

    handleBDayBlur(e) {
        if(!e.target.value && this.state.bday !== null) {
            e.currentTarget.type = "text";
        }
    }

    render() {
        let errorClass = ' has-error';
        let bday = BIRTHDAY;
        let titleLabel = null;

        if(this.props.card) {
            titleLabel = this.state.edited ? SAVED : null;
            titleLabel = this.props.card.fail ? ERROR : titleLabel;
        }

        if(this.state.bday) {
            bday = this.state.bday.split('-');
            bday = bday[2] + '.' + bday[1] + '.' + bday[0];
        }

        return (
            <Main>
                <br />
                <Ibox 
                    title={EDIT}
                    loading={!this.state.isLoaded} 
                    titleLabel={titleLabel}>
                    {!this.state.isNotFount && 
                        <div>

                            {/* Группа ввода */}
                            <div className="row">
                                
                                {/* Фамилия */}
                                <div className={"form-group col-md-4" + (!this.state.formValidate && !this.state.f.length ? errorClass : '')}>
                                    <label htmlFor="clientSurname">* {FIRST_NAME}</label>
                                    <input type="text" 
                                        name="f"
                                        value={this.state.f}
                                        onChange={e => this.handleChange(e)}
                                        className="form-control"
                                        id="clientSurname"
                                    />
                                </div>
                                
                                {/* Имя */}
                                <div className={"form-group col-md-4" + (!this.state.formValidate && !this.state.i.length ? errorClass : '')}>
                                    <label htmlFor="clientName">* {NAME}</label>
                                    <input type="text" 
                                        name="i"
                                        value={this.state.i}
                                        onChange={e => this.handleChange(e)}
                                        className="form-control"
                                        id="clientName"
                                    />
                                </div>

                                {/* Отчество */}
                                <div className="form-group col-md-4">                       
                                    <label htmlFor="clientPatronymic">{LAST_NAME}</label>
                                    <input type="text" 
                                        name="o"
                                        value={this.state.o}
                                        onChange={e => this.handleChange(e)}
                                        className="form-control"
                                        id="clientPatronymic"
                                    />
                                </div>

                            </div>

                            {/* Группа ввода */}
                            <div className="row">

                                {/* Номер телефона */}
                                <div 
                                    className={
                                        "form-group col-md-4" + 
                                        (
                                            (
                                                (!this.state.formValidate && this.state.phone.length !== 10) || 
                                                !this.state.phoneValidate) || !this.state.phoneUnique ? errorClass : ''
                                            )
                                    }
                                >
                                    <label htmlFor="phoneNumber">* {PHONE_NUMBER}</label>
                                    <input type="tel" 
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={e => this.handleChange(e)}
                                        className="form-control"
                                        maxLength={10}
                                        id="PhoneNumber"
                                    />
                                    <small id="phoneHelpBlock" className="form-text text-muted">{PHONE_MASK}</small>
                                    {!this.state.phoneUnique && 
                                    <div className="text-danger">
                                        {PHONE_USED}
                                        (<Link to={"/search/phone/" + this.state.phone}>{SEE_HERE}</Link>)
                                    </div>
                                }
                                </div>

                                {/* Дата рождения */}
                                <div 
                                    className={"form-group col-md-4" + (!this.state.formValidate && !this.state.bday ? errorClass : '')}>
                                    <label htmlFor="clientBithday">* {BIRTHDAY}</label>
                                    <input 
                                        type={this.state.bday ? "text" : "date"}
                                        placeholder={bday} 
                                        className="form-control"
                                        id="clientBirthday" 
                                        onFocus={e => this.handleBDayFocus(e)}
                                        onBlur={e => this.handleBDayBlur(e)}
                                        ref={input => this.bday = input} 
                                    />
                                </div>

                                {/* Пол */}
                                <div className="form-group col-md-4">                           
                                    <label htmlFor="clientGender">{GENDER}</label>
                                    <select
                                        value={this.state.sex}
                                        name="sex"
                                        onChange={e => this.handleChange(e)}
                                        className="form-control" 
                                        id="clientGender"
                                    >
                                        <option value="none">{CHOOSE_GENDER}</option>
                                        <option value="male">{MALE}</option>
                                        <option value="female">{FEMALE}</option>
                                    </select>
                                </div>

                            </div>

                            {/* Согласие на рассылку */}

                            <div className="form-group">
                                <div className="checkbox checkbox-inline checkbox-primary">
                                    <input 
                                        id="adv"
                                        name="adv"
                                        type="checkbox"
                                        checked={this.state.adv} 
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <label htmlFor="adv">{SUBSCRIBE_AGREEMENT}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <button type="submit" className="btn btn-primary" onClick={() => this.handleEdit()}>{SAVE}</button>
                                </div>
                            </div>
                        </div>
                    } 
                    {this.state.isNotFount && <div className="text-center m-t-sm m-b-sm">{NOT_FOUND}</div>}
                </Ibox>
            </Main>
        )
    }
}

function mapStateToProps(state) {
    return {
        checkID: state.core.checkID,
        card: state.core.card
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            cardToEdit: cardToEdit,
            cardEdit: cardEdit
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(Edit);