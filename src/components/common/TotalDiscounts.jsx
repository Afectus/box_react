import React from 'react';
import { connect } from 'react-redux';

import Ibox from './Ibox';

class TotalDiscount extends React.Component {

    render() {
        const bonus = this.props.goodsData.check_checkd;
        return this.props.checkID ? 
            (<Ibox title="Скидки" tools={true}>
                {bonus && bonus.length ? (
                    bonus.map((item, index) => (
                        <div key={'discounts-' + index}><b>{item.desc}: </b> {item.value} р.</div>    
                    ))
                    ) : (
                        <div className="text-center">Скидок нет</div>
                    )
                }
            </Ibox>) : null;
    }
}

function mapStateToProps(state) {
    return {
        checkID: state.core.checkID,
        goodsData: state.goodsSelected
    }
}

export default connect(mapStateToProps)(TotalDiscount);