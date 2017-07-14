import ActionTypes from '../actions/ActionTypes';
import lodash from 'lodash';


const _channelsErrorState = () => ({ streams: ["error"] })
const _outputChannelIdList = (state) => (state.map((e) => (e.channel._id)))
const _delDuplication = (state, streams) => {
    const stateChannelIdList = _outputChannelIdList(state);
    return streams.filter((e) => (!stateChannelIdList.includes(e.channel._id)));
}
export const channels = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_SUCCESS:
            return action.json.streams;
        case ActionTypes.SEARCH_FAIL:
            console.log(action.status)
            return _channelsErrorState();
        case ActionTypes.GET_MORE_SUCCESS:
            const addedDate = _delDuplication(state, action.json.streams);
            return [...state, ...addedDate];
        case ActionTypes.GET_MORE_FAIL:
            console.log(action.status)
            return state;
        default:
            return state;
    }
};


export const homePage = (state = true, action) => {
    switch (action.type) {
        case ActionTypes.CLOSE_HOME_PAGE:
            return false;
        default:
            return state;
    }
};


const _viewModeStateInit = () => ({ mode: 'list', url: '' });
const _viewModeChangeDecider = (mode, url) => ((mode === 'video' && url) ? { mode: 'video', url: url } : { mode: 'list', url: '' });
export const viewMode = (state = _viewModeStateInit(), action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_VIEW_MODE:
            return _viewModeChangeDecider(action.newMode, action.url);
        default:
            return state;
    }
};


export const loadingIcon = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_LOADING_ICON:
            return !state;
        default:
            return state;
    }
};


const _requestStatusInit = () => ({ text: '', total: 0, waiting: false, offset: 25, limit: 20 });
export const requestStatus = (state = _requestStatusInit(), action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_REQUEST_TEXT:
            return { text: action.requestText, ...lodash.omit(state, ['text']) };
        case ActionTypes.UPDATE_TOTAL_DATA:
            return { total: action.total,...lodash.omit(state, ['total']) };
        case ActionTypes.UPDATE_WAITING_STATUS:
            return { waiting: action.waiting, ...lodash.omit(state, ['waiting']) };
        case ActionTypes.SEARCH_SUCCESS:
            return { offset: 25, ...lodash.omit(state, ['offset']) };
        case ActionTypes.GET_MORE_SUCCESS:
            return { offset: state.offset+state.limit, ...lodash.omit(state, ['offset']) };
        default:
            return state;
    }
}

const _dealKeywords = (keywords) => (keywords.length > 0 ? keywords.map((e) => ({ name: e.localized_name, logo: e.box.small })).slice(0, 5) : []);
export const keywords = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.KEYWORD_REQUEST_SUCCESS:
            return _dealKeywords(action.json.games);
        case ActionTypes.KEYWORD_REQUEST_FAIL:
            console.log(action.status);
            return [];
        case ActionTypes.KEYWORD_REQUEST_CLEAR:
            return [];
        default:
            return state;
    }
};
