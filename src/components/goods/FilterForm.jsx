import React from 'react';
import { SEARCH } from '../../settings/lang';

const FilterForm = (props) => {
    return (
        <div className="form-group m-b-none">
            <div className="input-group">
                
                <input 
                    onChange={() => props.onChange()}
                    type="text" 
                    className="form-control" 
                    ref={props.filterRef}
                    placeholder={SEARCH} />

                <span className="input-group-btn">
                    
                    <button onClick={() => props.onClear()} type="button" className="btn btn-primary">
                        <i className="fa fa-times"></i>
                    </button>

                </span>

            </div>
        </div>
    );
}

export default FilterForm;
