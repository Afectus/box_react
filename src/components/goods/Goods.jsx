import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import $ from 'jquery';

import { chooseGood } from '../../actions';
import { checkNewItem } from '../../actions/check';
import { sort, goodsCount } from '../../functions';

import Ibox from '../common/Ibox';

import Select from './Select';
import FilterForm from './FilterForm';
import GoodItem from './Item';

import { 
    MESS_CREATE_CHECK, 
    GOODS_LIST, 
    GIFTS, 
    GOODS_TAXES, 
    GOOD_NAME, 
    GOOD_PRICE,
    IN_STOCK,
    PRICE_FROM,
    PRICE_TO,
    ID
} from '../../settings/lang';

class Goods extends React.Component {
    
    state = {
        goods: null,
        filterValue: '',
        filterTaxValue: [],
        filterInStock: false,
        filterPriceShow: false,
        filterPrice: false,
        filterPriceFrom: '',
        filterPriceTo: '',
        showGifts: false,
        selectOptions: '',
        filteredGoods: null,
        sortBy: null,
        sortOrder: false // false - DOWN, true - UP
    }
    
    componentDidMount() {
        this.setState({goods: this.props.goodsData});
    }

    componentDidUpdate() {
        $(this.goodsList).css('max-height', ($(window).height() - 310) + 'px');
    }
    
    handleChange() {
        this.setState({filterValue: this.filterGoods.value});        
    }
    
    handleClear() {
        this.filterGoods.value = '';
        this.setState({filterValue: ''});
    }

    handleShowGifts() {
        this.setState({showGifts: !this.state.showGifts})
    }

    handleInStock() {
        this.setState({filterInStock: !this.state.filterInStock});
    }

    handleChoose(item) {
        this.props.chooseGood(item);
    }

    handleAddGood(item) {
        if(!this.props.checkID) {
            toastr.options.progressBar = true;
            toastr.options.closeButton = true;
            toastr.warning(MESS_CREATE_CHECK);
        } else {
            this.props.checkNewItem(this.props.checkID, item);
        }
    }

    handlePrice() {
        let priceFrom = this.priceFrom.value;
        let priceTo = this.priceTo.value;

        if(priceFrom.length || priceTo.length) {
            
            this.setState({
                filterPrice: true,
                filterPriceFrom: priceFrom,
                filterPriceTo: priceTo
            });

        } else {
            this.handlePriceClear();
        }
    }

    handlePriceClear() {
        this.priceFrom.value = '';
        this.priceTo.value = '';
        this.setState({filterPrice: false, filterPriceFrom: '', filterPriceTo: ''});
    }

    handleTaxSelect(){
        let options = this.select.options;
        let arr = [];
        for(let i = 0; i < options.length; i++) {
            if(options[i].selected) {
                arr.push(Number(options[i].value));
            }
        }
        const categories = this.props.goodsTax;
        categories.forEach(elem => {
            arr.forEach(item => {
                if(elem.parent === Number(item)) {
                    arr.push(elem.id);
                }
            })
        });
        this.setState({filterTaxValue: arr});
    }

    handleOnSort(by) {
        this.setState({
            sortBy: by,
            sortOrder: this.state.sortBy !== by ? this.state.sortOrder : !this.state.sortOrder
        });
    }

    handleFilter(filter) {
        let data = filter.filter(
            (item) => {
                
                let result = false;
                
                if(item.name && item.id) {
                    let name = item.name.toLowerCase();
                    let id = item.id.toString();
                    let value = this.state.filterValue.toLowerCase();
                    let barcode = item.barcodelist_goods;
                    if(name.includes(value) || id.includes(value)) {
                        result = item;
                    } else if(barcode && barcode.length) {
                        barcode.forEach(elem => {
                            if(elem.barcode.includes(value)) {
                                result = item;
                            }
                        })
                    } else {
                        result = false;
                    }
                }

                if(this.state.filterTaxValue.length > 0) {
                    let have = false;
                    this.state.filterTaxValue.forEach(elem => {
                        if(item.tax.length && item.tax.includes(elem)) {
                            have = item;
                        }
                    });
                    result = result ? have : false;
                }

                if((this.state.showGifts && !item.gift) || (this.state.filterInStock && !goodsCount(item.goodsinstock_goods))) {
                    return false;
                }

                if(this.state.filterPrice) {
                    let priceFrom = Number(this.state.filterPriceFrom);
                    let priceTo = this.state.filterPriceTo === '' ? -1 : Number(this.state.filterPriceTo);
                    let priceItem = Number(item.price);
                    let show = false;
                    
                    if(priceFrom <= priceItem) {
                        show = true;
                    }
                    
                    if(priceTo >= priceItem) {
                        show = true;
                    } else if(priceTo > -1) {
                        show = false;
                    }
                    
                    return show ? result : false;
                }
                return result;
            }
        );
        return data;
    }
    
    handleSort(data) {
        let by = this.state.sortBy;
        function sortUp (a, b) {
            if (a[by] < b[by]) return -1;
            if (a[by] > b[by]) return 1;
            return 0;
        }
        function sortDown (a, b) {
            if (a[by] > b[by]) return -1;
            if (a[by] < b[by]) return 1;
            return 0;
        }
        return this.state.sortOrder ? data.sort(sortUp) : data.sort(sortDown);
    }

    render() {
        
        const tax = sort(this.props.goodsTax);
        let data = this.handleFilter(this.props.goodsData);
        const sortIcon = <i className={"fas fa-sort-" + (this.state.sortOrder ? 'up' : 'down')}></i>;
        data = this.state.sortBy ? this.handleSort(data) : data;

        return (
            <Ibox title={GOODS_LIST} tools={true} loading={!this.props.isGoodsLoaded}>
                
                <FilterForm 
                    onChange={() => this.handleChange()} 
                    onClear={() => this.handleClear()}
                    filterRef={el => this.filterGoods = el}
                />
                
                <div className="form-group">
                    <div className="checkbox checkbox-inline checkbox-primary">
                        <input type="checkbox" id="showGifts" onChange={() => this.handleShowGifts()} />
                        <label htmlFor="showGifts">{GIFTS}</label>
                    </div>
                    <div className="checkbox checkbox-inline checkbox-primary">
                        <input type="checkbox" id="inStock" onChange={() => this.handleInStock()} />
                        <label htmlFor="inStock">{IN_STOCK}</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="price-filter">
                        <input 
                            type="text" 
                            onChange={() => this.handlePrice()} 
                            ref={input => this.priceFrom = input}
                            placeholder={PRICE_FROM} 
                            className="form-control" 
                        />
                        <input 
                            type="text" 
                            onChange={() => this.handlePrice()} 
                            ref={input => this.priceTo = input}
                            placeholder={PRICE_TO}
                            className="form-control" 
                        />
                        <span className="btn btn-primary" onClick={() => this.handlePriceClear()}>
                            <i className="fa fa-times"></i>
                        </span>
                    </div>
                </div>

                <Select 
                    data={tax}
                    title={GOODS_TAXES}
                    selectRef={el => this.select = el}
                    onChange={() => this.handleTaxSelect()}
                />

                {this.props.isGoodsLoaded &&
                    <div className="table-responsive goods-table" ref={el => this.goodsList = el}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th onClick={() => this.handleOnSort('id')}>
                                        {ID} {this.state.sortBy === 'id' && sortIcon}
                                    </th>
                                    <th onClick={() => this.handleOnSort('name')}>
                                        {GOOD_NAME} {this.state.sortBy === 'name' && sortIcon}
                                    </th>
                                    <th onClick={() => this.handleOnSort('price')} style={{minWidth: '62px'}}>
                                        {GOOD_PRICE} {this.state.sortBy === 'price' && sortIcon}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <GoodItem 
                                        key={'goods-item-' + index} 
                                        onChoose={() => this.handleChoose(item)} 
                                        onAddGood={() => this.handleAddGood(item)}
                                        item={item} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </Ibox>
        )
    }
}

function mapStateToProps(state) {
    return {
        goodsData: state.goodsData,
        goodsTax: state.goodsTax,
        isGoodsLoaded: state.core.isGoodsLoaded,
        checkID: state.core.checkID
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            checkNewItem: checkNewItem,
            chooseGood: chooseGood
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(Goods);