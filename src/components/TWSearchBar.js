import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TWActions from '../actions/TWActions';
import { TWAutoSuggest } from './TWAutoSuggest';
import lodash from 'lodash';


class TWSearchBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || '',
            keywordIndex: -1,
            keywordsClassDisplay: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.requestKeywordList = lodash.debounce(this.requestKeywordList.bind(this), 300);
        this.handleMouseMoveAndClick = this.handleMouseMoveAndClick.bind(this);
        this.handleBlurAndFocus = this.handleBlurAndFocus.bind(this);
    }


    requestKeywordList(query) {
        const { keywordSearchRequest } = this.props;
        this.setState({ keywordIndex: -1 });
        const re = /[a-zA-Z0-9]/
        if (re.test(query.trim())) {
            keywordSearchRequest(query.trim());
        }
        else if (!query.trim()) {
            keywordSearchRequest('');
        }
        else {
            return;
        }
    }

    handleChange(e) {

        this.setState({ value: e.target.value });
        this.requestKeywordList(e.target.value);

    }

    handleKeyDown(e) {
        const {
            keywordIndex,
            value
        } = this.state;
        const {
            onKeyDown,
            keywords,
            searchRequest
        } = this.props;

        const keywordsNameList = keywords.map((e) => (e.name.toLowerCase()));

        switch (e.keyCode) {
            case 13:
                if (value.trim() && (keywordIndex !== -1 || keywordsNameList.includes(value.trim().toLowerCase()))) {
                    // debugger;
                    searchRequest && searchRequest(value.trim());
                }
                break;
            case 40:
                if (keywords.length > 0) {
                    const newKeywordIndexDown = keywordIndex + 1 > keywords.length - 1 ? keywordIndex : keywordIndex + 1;
                    this.setState({
                        keywordIndex: newKeywordIndexDown,
                        value: keywords[newKeywordIndexDown].name
                    });
                }
                break;
            case 38:
                if (keywords.length > 0) {
                    const newKeywordIndexUp = keywordIndex - 1 < 0 ? keywordIndex : keywordIndex - 1;
                    this.setState({
                        keywordIndex: newKeywordIndexUp,
                        value: keywords[newKeywordIndexUp].name
                    });
                }
                break;
            default:
                break;
        }
        onKeyDown && onKeyDown(e);
    }

    handleMouseMoveAndClick(idx, type) {
        return (e) => {
            const {
                keywords,
                searchRequest
            } = this.props;
            if (type === 'enter'){ 
                this.setState({ 
                    keywordIndex: idx, 
                    value: keywords[idx].name
                });
            }
            else if (type === 'click') {
                this.setState({
                    keywordIndex: idx,
                    value: keywords[idx].name
                });
                searchRequest && searchRequest(this.state.value.trim());
            }
            else {
                return;
            }
        }
    }

    handleBlurAndFocus(){
        setTimeout(()=>this.setState({keywordsClassDisplay: !this.state.keywordsClassDisplay}),300);
    }



    render() {
        const {
            autoFocus,
            searchBarClassName,
            searchRequest,
            keywords,
            homePage
        } = this.props;

        return (
            <div>
                <input
                    className={searchBarClassName}
                    type="text"
                    placeholder="Search"
                    autoFocus={autoFocus}
                    value={this.state.value}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onFocus={this.handleBlurAndFocus}
                    onBlur={this.handleBlurAndFocus}
                    
                />
                <TWAutoSuggest
                    searchRequest={searchRequest}
                    keywords={keywords}
                    keywordIndex={this.state.keywordIndex}
                    homePage={homePage}
                    handleMouseMoveAndClick={this.handleMouseMoveAndClick}
                    keywordsClassDisplay={this.state.keywordsClassDisplay}
                />
            </div>
        );
    }
}


TWSearchBar.propTypes = {
    searchRequest: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    onKeyDown: PropTypes.func,
    searchBarClassName: PropTypes.string.isRequired,
    homePage: PropTypes.bool.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.object)
}


export default connect(
    (state) => ({
        keywords: state.keywords,
        homePage: state.homePage
    }),
    {
        keywordSearchRequest: TWActions.keywordSearchRequest,
    }
)(TWSearchBar);