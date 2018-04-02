import React from 'react';

class OpenCheck extends React.Component {
    state = {
        value: ''
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() { 
        return (
            <div 
                className="modal fade" 
                id={this.props.id} 
                tabIndex="5" 
                aria-hidden="true" 
                style={{display: "none"}}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">Открыть чек</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <label htmlFor="checkID" className="col-sm-4 col-form-label">Чек ID</label>
                                <div className="col-sm-8">
                                    <input type="text"
                                        value={this.state.value}
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control" 
                                        id="checkID"
                                        ref={this.props.checkRef}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.onCheck()} data-dismiss="modal">Открыть</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OpenCheck;