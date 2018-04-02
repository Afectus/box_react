import React from 'react';
import { TAXES } from '../../settings/lang';

class Select extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputFocus: false,
            choosed: [],
            change: false,
            data: null
        }
    }

    componentDidUpdate() {

        if(this.props.data.length && !this.state.data) this.setState({data: this.props.data});
        if(this.state.change) {
            this.props.onChange();
            this.setState({change: false});
        }
        
    }

    handleFocus() {
        this.setState({inputFocus: true});
    }
    
    handleBlur(e) {
        var currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                this.setState({inputFocus: false});
            }
        }, 400);
    }
    
    handleSetFocus() {
        this.input.focus();
    }
    
    handleChoose(item) {
        this.setState({
            choosed: this.state.choosed.length ? this.state.choosed.concat([item]) : [item],
            change: true,
            inputFocus: false
        });
    }
    
    handleDelete(item) {
        let array = this.state.choosed;
        let index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
            this.setState({choosed: array, change: true});
        }
    }

    handleChange() {
        this.props.onChange();
    }

    handleClear() {
        this.setState({choosed: []});
    }
    
    render () {
        
        const data = this.state.data ? this.state.data.map(item => {
            return item.map(elem => {
                if(this.state.choosed.includes(elem)) {elem.selected = true} else {elem.selected = false};
                return elem;
            })
        }) : [];

        let selected = this.state.choosed.map(item => item.value);
        return (
            <div>
                <div className="form-group m-b-xs">
                    <div className={"multi-select" + (this.state.inputFocus ? ' focus' : '')}>
                        <select onChange={() => this.handleChange()} value={selected} multiple={true} ref={this.props.selectRef}>
                            {data.map((item) => (
                                item.map((elem, i) => (
                                    <option key={'selected-i-'+i} value={elem.value}>
                                        {elem.name}
                                    </option>
                                ))   
                            ))}
                        </select>
                        {this.state.choosed.length ? 
                            <span 
                                className="clear-select"
                                onClick={() => this.handleClear()}
                            >
                                <i className="fas fa-times"></i>
                            </span> : false}
                        <ul className="choosed" onClick={() => this.handleSetFocus()} onMouseLeave={this.handleBlur.bind(this)}>
                            {
                                this.state.choosed.map((item, index) => (
                                    <li key={'choosed-'+index}>
                                        {item.label.length > 12 ? item.label.substring(0, 12) + '..' : item.label} 
                                        <i onClick={() => this.handleDelete(item)} className="fa fa-times"></i>
                                    </li>
                                ))
                            }
                            <li className="input">
                                <input type="text" 
                                    ref={input => this.input = input}
                                    placeholder={TAXES} 
                                    onFocus={() => this.handleFocus()} 
                                    onBlur={this.handleBlur.bind(this)} 
                                />
                            </li>
                        </ul>
                        <ul className={"options" + (this.state.inputFocus ? ' show' : '')}>
                            <li className="open">{this.props.title}</li>
                            {data.map((item) => (
                                item.map((elem, i) => (
                                    <li 
                                        key={'option-'+i} 
                                        onClick={() => elem.selected ? false : this.handleChoose(elem)} 
                                        className={(elem.group ? 'group' : '')  + (elem.selected ? ' selected' : '')}
                                    >
                                        {elem.label}
                                    </li>
                                ))   
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Select;