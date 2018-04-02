import React from 'react';
import { 
    PHONE, 
    PHONE_NUMBER,
    FIRST_NAME, 
    CARD_NUMBER, 
    SEARCH
} from '../../settings/lang';

const SearchForm = (props) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="cardPhone">{PHONE}</label>
                    <input type="text" maxLength="10" placeholder={PHONE_NUMBER} className="form-control" id="cardPhone" ref={props.phoneRef} />
                </div>
                <button className="btn btn-primary" onClick={() => props.onSearch()}>{SEARCH}</button>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="cardBuyer">{FIRST_NAME}</label>
                    <input type="text" placeholder={FIRST_NAME} className="form-control" id="cardBuyer" ref={props.nameRef} />
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="cardNumber">{CARD_NUMBER}</label>
                    <input type="text" placeholder={CARD_NUMBER} className="form-control" id="cardNumber" ref={props.cardRef} />
                </div>
            </div>
        </div>
    )
}

export default SearchForm;