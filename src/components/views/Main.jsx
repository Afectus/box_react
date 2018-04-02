import React, { Component } from 'react';

import MainLayout from '../layouts/Main';
import Goods from '../goods/Goods';
import GoodsInStock from '../goods/InStock';
import InfoPanel from '../infopanel/Panel';
import CheckGoods from '../check/Table';
import TotalDiscounts from '../common/TotalDiscounts';
import Payment from '../payment/Payment';

class Main extends Component {
    render() {
        return (
            <MainLayout auth={true}>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-md-8">
                            <InfoPanel />
                            <CheckGoods />
                            <div className="row">
                                <div className="col-md-7">
                                    <TotalDiscounts />
                                </div>
                                <div className="col-md-5">
                                    <Payment />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Goods />
                            <GoodsInStock />
                        </div>
                    </div>
                </div>
            </MainLayout>
        )
    }

}

export default Main;