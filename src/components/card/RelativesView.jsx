import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cardToEdit, cardAddRelative, cardRelativeDetail, cardRelativeUpdate } from '../../actions/card';
import Ibox from '../common/Ibox';
import Main from '../layouts/Main';
import RelativesTable from './RelativesTable';

import { 
    FULL_NAME,
    ID,
    PHONE_NUMBER,
    BUYER,
    RELATIVES,
    ADD_RELATIVES_T,
    RELATION_TYPE,
    RELATION_BROTHER,
    RELATION_DAUGHTER,
    RELATION_FATHER,
    RELATION_MOTHER,
    RELATION_OTHER,
    RELATION_SISTER,
    RELATION_SON,
    CHOOSE_RELATION_T,
    EDIT_RELATIONS,
    NAME,
    LAST_NAME,
    BIRTHDAY,
    WRITE } from '../../settings/lang';

class Relatives extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: true,
            edit: false,
            name: null,
            lastName: null,
            birthday: null,
            type: 'none'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBDayBlur = this.handleBDayBlur.bind(this);
        this.handleBDayFocus = this.handleBDayFocus.bind(this);
    }

    componentDidMount() {
        const { phone, edit } = this.props.match.params;
        
        if(phone) {
            this.props.cardToEdit(phone);
        }

        if(edit) {
            this.setState({edit: edit});
            this.props.cardRelativeDetail(edit, phone);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.cardRelative && this.state.edit) {
            this.setState({
                name: nextProps.cardRelative.i,
                lastName: nextProps.cardRelative.o,
                birthday: nextProps.cardRelative.bday,
                type: nextProps.cardRelative.type
            })
        }

        if(nextProps.match.params && nextProps.match.params.edit !== this.state.edit && nextProps.match.params.edit) {
            this.setState({edit: nextProps.match.params.edit});
            this.props.cardRelativeDetail(nextProps.match.params.edit);
        }

    }

    handleSave() {
        
        let name = this.name.value;
        let lastName = this.lastName.value;
        let birth = this.state.birthday || this.props.cardRelative.bday;
        let relType = this.relType.value;

        if(name && lastName && birth && relType !== 'none') {
            let params = {
                i: name,
                o: lastName,
                bday: birth,
                type: relType
            }
            
            if(this.state.edit) {
                this.props.cardRelativeUpdate({...params, id: this.state.edit}, this.props.card.phone);
            } else {
                this.props.cardAddRelative({...params, buyer: this.props.card.id}, this.props.card.phone);
            }
            
            if(!this.state.formValid) this.setState({formValid: true});
                
        } else {
            this.setState({formValid: false});
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleBDayFocus(e) {
        e.currentTarget.type = "date";
    }

    handleBDayBlur(e) {
        if(!e.target.value && this.state.birthday !== null) {
            e.currentTarget.type = "text";
        }
    }

    render() {
        const error = ' has-error';
        let bday = '';
        
        if(this.state.birthday) {
            bday = this.state.birthday.split('-');
            bday = bday[2] + '.' + bday[1] + '.' + bday[0];
        }

        return (
            <Main>
                <br />
                <Ibox title={this.state.edit ? EDIT_RELATIONS : ADD_RELATIVES_T}>
                    <div className="row">
                        <div className="col-md-6">    
                            
                            {/* Степень родства */}
                            <div className={"form-group" + (!this.state.formValid && this.relType.value === 'none' ? error : '')}>                           
                                <label htmlFor="clientGender">* {RELATION_TYPE}</label>
                                <select
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                    className="form-control" 
                                    id="relativeType"
                                    ref={el => this.relType = el}
                                >
                                    <option value="none">
                                        {CHOOSE_RELATION_T}
                                    </option>
                                    <option value="son">
                                        {RELATION_SON}
                                    </option>
                                    <option value="d">
                                        {RELATION_DAUGHTER}
                                    </option>
                                    <option value="f">
                                        {RELATION_FATHER}
                                    </option>
                                    <option value="m">
                                        {RELATION_MOTHER}
                                    </option>
                                    <option value="sis">
                                        {RELATION_SISTER}
                                    </option>
                                    <option value="b">
                                        {RELATION_BROTHER}
                                    </option>
                                    <option value="other">
                                        {RELATION_OTHER}
                                    </option>
                                </select>
                            </div>

                            {/* Имя */}
                            <div className={"form-group" + (!this.state.formValid && !this.name.value ? error : '')}>
                                <label htmlFor="clientName">* {NAME}</label>
                                <input type="text" 
                                    name="name"
                                    value={this.state.name || ''}
                                    onChange={this.handleChange}
                                    placeholder={NAME}
                                    className="form-control"
                                    id="clientName"
                                    ref={el => this.name = el}
                                />
                            </div>
                            {/* Отчество */}
                            <div className={"form-group" + (!this.state.formValid && !this.lastName.value ? error : '')}>                       
                                <label htmlFor="clientPatronymic">* {LAST_NAME}</label>
                                <input type="text" 
                                    name="lastName"
                                    value={this.state.lastName || ''}
                                    onChange={this.handleChange}
                                    placeholder={LAST_NAME}
                                    className="form-control"
                                    id="clientPatronymic"
                                    ref={el => this.lastName = el}
                                />
                            </div>
                            {/* Дата рождения */}
                            <div 
                                className={"form-group" + (!this.state.formValid && !this.birth.value ? error : '')}>
                                <label htmlFor="clientBithday">* {BIRTHDAY}</label>
                                <input 
                                    type={this.state.edit ? "text" : "date"}
                                    placeholder={bday}
                                    onChange={this.handleChange}
                                    onFocus={this.handleBDayFocus}
                                    onBlur={this.handleBDayBlur}
                                    className="form-control"
                                    name="birthday"
                                    id="clientBirthday"
                                    ref={el => this.birth = el}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={() => this.handleSave()} className="btn btn-primary">{WRITE}</button>
                            </div>
                        </div>
                        {this.props.card &&
                            <div className="col-md-6">
                                <div>
                                    <h4>{BUYER}</h4>
                                    <hr />
                                    <div>
                                        <b>{ID}:</b> {this.props.card.id}
                                    </div>
                                    <div>
                                        <b>{FULL_NAME}:</b> {this.props.card.f} {this.props.card.i} {this.props.card.o}
                                    </div>
                                    <div>
                                        <b>{BIRTHDAY}:</b> {this.props.card.bday}
                                    </div>
                                    <div className="m-b-lg">
                                        <b>{PHONE_NUMBER}:</b> {this.props.card.phone}
                                    </div>
                                    <h4>{RELATIVES}</h4>
                                    <RelativesTable relatives={this.props.card.buyerrel_buyer} phone={this.props.card.phone} />
                                </div>
                            </div>
                        }
                    </div>
                </Ibox>
            </Main>
        )
    }
}

function mapStateToProps(state) {
    return {
        card: state.core.card,
        cardRelative: state.core.cardRelative
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            cardToEdit: cardToEdit,
            cardAddRelative: cardAddRelative,
            cardRelativeDetail: cardRelativeDetail,
            cardRelativeUpdate: cardRelativeUpdate
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(Relatives);