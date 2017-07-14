import ActionTypes from './ActionTypes';


const clientId = '7t05gs633qkjig48ib1ajfjemb1a0r';
const requestConfiguration = {
    method: 'GET',
    headers: {
        'Client-ID': clientId,
    },
};


export const searchSuccess = (json) => {
    return {
        type: ActionTypes.SEARCH_SUCCESS,
        json
    };
}

export const searchFail = (status) => {
    return {
        type: ActionTypes.SEARCH_FAIL,
        status
    };
}

export const getMoreSuccess = (json) => {
    return {
        type: ActionTypes.GET_MORE_SUCCESS,
        json
    };
}


export const getMoreFail = (status) => {
    return {
        type: ActionTypes.GET_MORE_FAIL,
        status
    };
}

export const closeHomePage = () => {
    return {
        type: ActionTypes.CLOSE_HOME_PAGE,
    };
}

export const changeViewMode = (newMode, url) => {
    return {
        type: ActionTypes.CHANGE_VIEW_MODE,
        newMode,
        url
    };
}

export const toggleLoadingIcon = () => {
    return {
        type: ActionTypes.TOGGLE_LOADING_ICON,
    };
}

export const updateRequestText = (requestText) => {
    return {
        type: ActionTypes.UPDATE_REQUEST_TEXT,
        requestText
    };
}

export const updateTotalData = (total) => {
    return {
        type: ActionTypes.UPDATE_TOTAL_DATA,
        total
    };
}

export const updateWaitingStatus = (waiting) => {
    return {
        type: ActionTypes.UPDATE_WAITING_STATUS,
        waiting
    };
}


export const afterSearchSuccess = (dispatch, json) => {
    dispatch(searchSuccess(json));
    dispatch(toggleLoadingIcon());
    dispatch(updateTotalData(json._total));
    dispatch(keywordSearchClear());
}


export const afterSearchFail = (dispatch, status) => {
    dispatch(searchFail(status));
    dispatch(toggleLoadingIcon());
}


export const afterGetMoreSuccess = (dispatch, json) => {
    dispatch(getMoreSuccess(json));
    dispatch(toggleLoadingIcon());
    dispatch(updateTotalData(json._total));
    dispatch(updateWaitingStatus(false));
}


export const afterGetMoreFail = (dispatch, status) => {
    dispatch(getMoreFail(status));
    dispatch(toggleLoadingIcon());
    dispatch(updateWaitingStatus(false));
}

export const searchFetch = (query, offset, limit) => {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    const requestUrl = `https://api.twitch.tv/kraken/streams/?game=${query}&offset=${offset}&limit=${limit}`;
    return fetch(requestUrl, requestConfiguration);
}


export const firstSearch = (query) => {
    return (dispatch) => {
        dispatch(toggleLoadingIcon());
        dispatch(updateRequestText(query));
        searchFetch(query)
            .then(response => response.ok ? response.json() : Promise.reject(response.status))
            .then(
                json => { afterSearchSuccess(dispatch, json); dispatch(closeHomePage()); },
                status => afterSearchFail(dispatch, status)
            )
    }
}


export const searchRequest = (query) => {
    return (dispatch) => {
        dispatch(toggleLoadingIcon());
        dispatch(updateRequestText(query));
        searchFetch(query)
            .then(response => response.ok ? response.json() : Promise.reject(response.status))
            .then(
                json => { afterSearchSuccess(dispatch, json); dispatch(changeViewMode('list')); },
                status => afterSearchFail(dispatch, status)
            )
    }
}


export const moreDataRequest = (query, offset, limit) => {
    return (dispatch) => {
        dispatch(toggleLoadingIcon());
        dispatch(updateWaitingStatus(true));
        searchFetch(query, offset, limit)
            .then(response => response.ok ? response.json() : Promise.reject(response.status))
            .then(
                json => { afterGetMoreSuccess(dispatch, json) },
                status => afterGetMoreFail(dispatch, status)
            )
    }
}

export const keywordSearchFetch = (query) => {
    const requestUrl = `https://api.twitch.tv/kraken/search/games?type=suggest&query=${query}`;
    return fetch(requestUrl, requestConfiguration);
}

export const keywordSearchSuccess = (json) => {
    return {
        type: ActionTypes.KEYWORD_REQUEST_SUCCESS,
        json
    };
}

export const keywordSearchFail = (status) => {
    return {
        type: ActionTypes.KEYWORD_REQUEST_FAIL,
        status
    };
}

export const keywordSearchClear = (status) => {
    return {
        type: ActionTypes.KEYWORD_REQUEST_CLEAR,
    };
}

export const keywordSearchRequest = (query) => {
    if (!query) {
        return keywordSearchClear();
    }
    else {
        return (dispatch) => {
            dispatch(toggleLoadingIcon());
            keywordSearchFetch(query)
                .then(response => response.ok ? response.json() : Promise.reject(response.status))
                .then(
                    json => { dispatch(keywordSearchSuccess(json)); dispatch(toggleLoadingIcon());},
                    status => { dispatch(keywordSearchFail(status)); dispatch(toggleLoadingIcon());}
                )
        }
    }
}