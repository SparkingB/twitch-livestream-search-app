import React from 'react';
import PropTypes from 'prop-types';



export class TWAutoSuggest extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { value: props.value || '' };
    }

    render() {
        const { 
            keywords,
            keywordIndex,
            homePage,
            handleMouseMoveAndClick,
            keywordsClassDisplay
        } = this.props;
        
        const keywordItemClassName = homePage ? 'keyword-item' : 'keyword-item-list';

        const keywordItems = keywords.map(
            (keyword,idx) => (
                <div 
                    key={idx} 
                    className={idx === keywordIndex ? `${keywordItemClassName} selected-keyword-item` : keywordItemClassName }
                    onMouseEnter={handleMouseMoveAndClick(idx,'enter')}
                    onClick={handleMouseMoveAndClick(idx,'click')}
                >
                    <img src={keyword.logo} alt=""/>
                    <span>{keyword.name}</span>
                </div>
            )
        );
        
        return (
            <div 
                className={keywordsClassDisplay ? "keywords" : "keywords keywords-invisible"}
            >{keywordItems}</div>
        );
    }
}


TWAutoSuggest.propTypes = {
    searchRequest: PropTypes.func.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.object.isRequired),
    keywordIndex: PropTypes.number.isRequired
}
