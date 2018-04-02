import React from 'react';
import history from '../../functions/history';
import {
    NO_RELATIVES,
    RELATION_BROTHER,
    RELATION_DAUGHTER,
    RELATION_FATHER,
    RELATION_MOTHER,
    RELATION_OTHER,
    RELATION_SISTER,
    RELATION_SON } from '../../settings/lang';

const RelativesTable = (props) => {

    const handleEdit = (id) => {
        history.push('/card-rel/' + props.phone + '/' + id)
    }

    const relationType = (type) => {
        if(type === 'son') {
            return RELATION_SON;
        } else if(type === 'd') {
            return RELATION_DAUGHTER;
        } else if(type === 'f') {
            return RELATION_FATHER;
        } else if(type === 'm') {
            return RELATION_MOTHER;
        } else if(type === 'sis') {
            return RELATION_SISTER;
        } else if(type === 'b') {
            return RELATION_BROTHER;
        } else if(type === 'other') {
            return RELATION_OTHER;
        }
    }

    return (
        <table className="table">
            <tbody>
                {props.relatives ?
                    props.relatives.map((item, index) => (
                        <tr key={"card-r-" + index}>
                            <td>{item.i} {item.o}</td>
                            <td>{relationType(item.type)}</td>
                            <td>{item.bday}</td>
                            <td>
                                <i onClick={() => handleEdit(item.id)} className="fa fa-pencil" aria-hidden="true"></i>
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td>{NO_RELATIVES}</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default RelativesTable;