import React, { Component}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../functions/history';
import { changeBuyer } from '../../actions/check';
import SearchItem from './SearchItem';
import {
    DATA,
    RELATIVES,
    CARD,
    EDIT_SH
} from '../../settings/lang';

class SearchResult extends Component {
  
    handleSelectClient(client) {
        this.props.client(client, this.props.check ? this.props.check : null);
        history.push('/');
    }

    render() {
        const data = this.props.data;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>{DATA}</th>
                        <th>{RELATIVES}</th>
                        <th>{CARD}</th>
                        <th>{EDIT_SH}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <SearchItem key={'card-s-item-' + index} item={item} onSelect={() => this.handleSelectClient(item)} />
                    ))}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        check: state.core.checkID
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            client: changeBuyer
        },
        dispatch
    )
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchResult);