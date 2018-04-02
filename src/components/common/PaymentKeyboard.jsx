import React from 'react';

const PaymentKeyboard = (props) => {
    const handleClick = (e) => {
        props.onChange(e.target.value);
    }
    const handleDel = () => {
        props.onCut();
    }
    return (
        <div>
            <div className="row m-t-xl">
                <div className="col-md-12 m-b-sm">
                    <button type="button" onClick={handleClick.bind(this)} value="7" className="btn btn-default btn-lg m-r-sm">7</button>
                    <button type="button" onClick={handleClick.bind(this)} value="8" className="btn btn-default btn-lg m-r-sm">8</button>
                    <button type="button" onClick={handleClick.bind(this)} value="9" className="btn btn-default btn-lg m-r-sm">9</button>
                </div>
                <div className="col-md-12 m-b-sm">
                    <button type="button" onClick={handleClick.bind(this)} value="4" className="btn btn-default btn-lg m-r-sm">4</button>
                    <button type="button" onClick={handleClick.bind(this)} value="5" className="btn btn-default btn-lg m-r-sm">5</button>
                    <button type="button" onClick={handleClick.bind(this)} value="6" className="btn btn-default btn-lg m-r-sm">6</button>
                    </div>
                <div className="col-md-12 m-b-sm">
                    <button type="button" onClick={handleClick.bind(this)} value="1" className="btn btn-default btn-lg m-r-sm">1</button>
                    <button type="button" onClick={handleClick.bind(this)} value="2" className="btn btn-default btn-lg m-r-sm">2</button>
                    <button type="button" onClick={handleClick.bind(this)} value="3" className="btn btn-default btn-lg m-r-sm">3</button>
                </div>
                <div className="col-md-12">
                    <button type="button" onClick={handleClick.bind(this)} value="0" className="btn btn-default btn-lg m-r-sm">0</button>
                    <button type="button" onClick={handleClick.bind(this)} value="." className="btn btn-default btn-lg m-r-sm">.</button>
                    <button type="button" onClick={handleDel.bind(this)} className="btn btn-default btn-lg m-r-sm">
                        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentKeyboard;