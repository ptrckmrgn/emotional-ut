import Firebase from 'firebase';
import 'firebase/firestore';
import axios from 'axios'
import _ from 'lodash';

export const PROCESS_VIDEO = 'process_video';
export const CHECK_STATUS = 'check_status';
export const SET_STATUS = 'set_status';

const BASE_URL = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/';
const KEY = '912bb25e231e4a85927d92635c3a9cb0';

const Interviews = Firebase.firestore().collection('interviews');

export const processVideo = (id, url) => {
    // TODO: limit calls
    const PARAMS = 'recognizeinvideo';
    let result = null;

    return dispatch => {
        axios({
            method: 'post',
            url: BASE_URL + PARAMS,
            headers: { 'Ocp-Apim-Subscription-Key': KEY },
            data: { url: url }
        }).then(response => {
            Interviews.doc(id).update({
                modified: _.now(),
                status: 'PROCESSING',
                operation: response.headers['operation-location']
            }).then(() => {
                this.checkStatus(response.headers['operation-location']);
                dispatch({
                    type: PROCESS_VIDEO,
                    payload: response
                });
            });
        });
    }
}

export const checkStatus = location => {
    // TODO: limit calls
    return dispatch => {
        axios({
            method: 'get',
            url: location,
            headers: { 'Ocp-Apim-Subscription-Key': KEY }
        }).then(response => {
            dispatch({
                type: CHECK_STATUS,
                payload: response
            });
        });
    };
}

export const setStatus = status => {
    return {
        type: SET_STATUS,
        payload: status
    };
}