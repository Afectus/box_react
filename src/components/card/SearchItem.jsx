import React from 'react';
import history from '../../functions/history';
import RelativesTable from './RelativesTable';
import { 
    ID,
    FULL_NAME,
    PHONE,
    CHOOSE,
    GENDER,
    MALE,
    FEMALE,
    NONE,
    BIRTHDAY,
    SUBSCRIBE,
    YES,
    NO,
    ADD_RELATIVES 
} from '../../settings/lang';

const SearchItem = (props) => {

    const handeEdit = () => {
        history.push('/card/' + props.item.phone);
    }

    const handleAddRelatives = () => {
        history.push('/card-rel/' + props.item.phone);
    }

    const itemGender = props.item.sex ? (props.item.sex === 'male' ? MALE : FEMALE) : NONE;

    return (
        <tr>
            <td>
                <div>
                    <small>
                        <b>{ID}:</b> {props.item.id}
                    </small>
                </div>
                <div>
                    <small>
                        <b>{FULL_NAME}:</b> {props.item.f} {props.item.i} {props.item.o}
                    </small>
                </div>
                <div>
                    <small>
                        <b>{GENDER}:</b> {itemGender}
                    </small>
                </div>
                <div>
                    <small>
                        <b>{BIRTHDAY}:</b> {props.item.bday}
                    </small>
                </div>
                <div>
                    <small>
                        <b>{SUBSCRIBE}:</b> {props.item.adv ? YES : NO}
                    </small>
                </div>
                <div>
                    <small>
                        <b>{PHONE}:</b> {props.item.phone}
                    </small>
                </div>
            </td>
            <td className="text-center">
                <div className="relatives-table text-left">
                    <RelativesTable relatives={props.item.buyerrel_buyer} phone={props.item.phone} />  
                </div>
                <button type="button" onClick={() => handleAddRelatives()} className="btn btn-info btn-sm mr-2">
                    {ADD_RELATIVES}
                </button>
            </td>
            <td>
                <button type="button" onClick={() => props.onSelect()} className="btn btn-success mr-2">
                    {CHOOSE} | {props.item.bonus} р.
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-secondary" onClick={() => handeEdit()} >
                    <i className="fa fa-pencil"></i>
                </button>
            </td>
        </tr>
    )
}

export default SearchItem;