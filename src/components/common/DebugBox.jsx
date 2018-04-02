import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkValid, checkRecalc, checkTest, checkDebugClear, checkGetInfo, coreapiSchema } from '../../actions/check';
import Ibox from './Ibox';

class DebugBox extends React.Component {
    render() {
        const sumconfirm = this.props.debugData ? this.props.debugData.sumconfirm || '' : '';
        const title = "Отладка - Чек ID: " + this.props.checkID + (sumconfirm ? ', sumconfirm: ' + sumconfirm : '');
        return (
            <Ibox title={title} tools={true}>
                <div className="row">
                    <div className="col-md-7">
                        <div className="debug">
                            <pre style={{maxHeight: '400px'}}>{JSON.stringify(this.props.debugData, undefined, 2) || ''}</pre>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <button type="button" onClick={() => this.props.schema()} className="minimalize-styl-2 btn btn-w-m btn-info">Coreapi Schema</button>
                        <button type="button" onClick={() => this.props.recalc(this.props.checkID)} className="minimalize-styl-2 btn btn-w-m btn-primary">Recalc</button>
                        <button type="button" onClick={() => this.props.test(this.props.checkID)} className="minimalize-styl-2 btn btn-w-m btn-primary">Test</button>
                        <button 
                            onClick={() => this.props.validCheck(this.props.checkID)}
                            type="button" 
                            className="minimalize-styl-2 btn btn-w-m btn-warning"
                        >Valid</button>
                        <button type="button"  data-toggle="modal" data-target="#check-id" className="minimalize-styl-2 btn btn-w-m btn-info">Открыть чек</button>
                        <button type="button" onClick={() => this.props.getInfo(this.props.checkID)} className="minimalize-styl-2 btn btn-w-m btn-primary">Get check info</button>
                        <button type="button" onClick={() => this.props.clear()} className="minimalize-styl-2 btn btn-w-m btn-danger">Clear</button>
                    </div>
                </div>
            </Ibox>
        )
    }
}

function mapStateToProps(state) {
    return {
        debugData: state.core.debugData, 
        checkID: state.core.checkID
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            validCheck: checkValid,
            test: checkTest,
            recalc: checkRecalc,
            clear: checkDebugClear,
            getInfo: checkGetInfo,
            schema: coreapiSchema
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(DebugBox);