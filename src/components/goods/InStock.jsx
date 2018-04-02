import React from 'react';
import { connect } from 'react-redux';

import Ibox from '../common/Ibox';
import { 
    GOODS_IN_STOCK,
    GOODS_STOCK,
    COUNT_SH
} from '../../settings/lang';

class InStock extends React.Component {
    render() {
        let good = this.props.chooseGood ? this.props.chooseGood.goodsinstock_goods : null;
        return (
            <Ibox title={GOODS_IN_STOCK} tools={true}>
                <div className="table-responsive">
                    {good && <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>{GOODS_STOCK}</th>
                                <th>{COUNT_SH}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {good.map((item, index) => (
                                <tr key={'goods-in-stock-' + index}>
                                    <td>{item.stock.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                            {!good.length &&
                                <tr>
                                    <td colSpan="2">
                                        <div className="text-center">Нет информации</div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>}
                    {!good &&
                        <div className="text-center">Нет информации</div>
                    }
                </div>
            </Ibox>
        )
    }
}



function mapStateToProps(state) {
    return {
        chooseGood: state.core.choosedGood
    }
}

export default connect(mapStateToProps)(InStock);