import React from 'react';
import apiClient from '../../coreapi';

import Main from '../layouts/Main';
import Ibox from '../common/Ibox';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import {
    CARD_SEARCH,
    SEARCH_NO_RESULT,
    SEARCH_RESULT
} from '../../settings/lang';

class Search extends React.Component {
    
    state = {
        usersFilter: [],
        searched: false
    }
    
    componentDidMount() {
        const { type, search } = this.props.match.params;
        if(type && search) {
            let params = {};
            params[type] = search;
            this.handleSearch(params);
        }
    }

    handleSearch(e) {
        
        let params = {};

        if(e) {
            params = e;
        } else {
            let name = this.name.value;
            let phone = this.phone.value;
            let card = this.card.value;
            
            if(name.length) {
                params = {f: name};
            } else if(phone.length) {
                params = {phone: phone};
            } else if(card.length) {
                params = {card: card}
            }
        }

        apiClient.action(apiClient.schema, ["buyer", "filter", "list"], params).then((result) => {
            this.setState({usersFilter: result, searched: true});
        });
    }

    render() {
        
        let searchResult = null;
        
        if(this.state.usersFilter.length) {
            searchResult = <SearchResult data={this.state.usersFilter} />;
        } else {
            searchResult = this.state.searched ? <div className="text-center m-b-xs m-t-xs">{SEARCH_NO_RESULT}</div> : false;
        }

        return (
            <Main auth={true}>
                <div className="row">
                    <br />
                    <div className="col-md-12">
                        <Ibox title={CARD_SEARCH} tools={true}>
                            <SearchForm 
                                phoneRef={el => this.phone = el}
                                nameRef={el => this.name = el}
                                cardRef={el => this.card = el}
                                onSearch={() => this.handleSearch()}
                            />
                        </Ibox>
                    </div>
                    {searchResult &&
                        <div className="col-md-12">
                            <Ibox title={SEARCH_RESULT} tools={true}>
                                {searchResult}
                            </Ibox>
                        </div>
                    }
                </div>
            </Main>
        )
    }
}



export default Search;