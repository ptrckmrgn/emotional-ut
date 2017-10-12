import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';
// import axios from 'axios';

export const FETCH_INTERVIEWS = 'fetch_interviews';
export const FETCH_INTERVIEW = 'fetch_interview';
export const CREATE_INTERVIEW = 'create_interview';
export const RESET_CREATE_INTERVIEW = 'reset_create_interview';
export const DELETE_INTERVIEW = 'delete_interview';

export const PROCESS_VIDEO = 'process_video';
export const CHECK_STATUS = 'check_status';

const BASE_URL = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/';
const KEY = '912bb25e231e4a85927d92635c3a9cb0';

// const config = {
//     apiKey: 'AIzaSyCzsSGWe-Y455OMj2XbGkY-qZMWj3YERsU',
//     authDomain: 'emotional-ut.firebaseapp.com',
//     // databaseURL: 'https://emotional-ut.firebaseio.com/',
//     projectId: 'emotional-ut',
//     // storageBucket: 'emotional-ut.appspot.com'
// };
// Firebase.initializeApp(config);

const Interviews = Firebase.firestore().collection('interviews');

export const fetchInterviews = () => {
    return dispatch => {
        Interviews.orderBy("created").onSnapshot(snapshot => {
            const interviews = _.chain(snapshot.docs)
                .mapKeys(doc => doc.id)
                .mapValues(doc => doc.data())
                .value();

            dispatch({
                type: FETCH_INTERVIEWS,
                interviews
            });
        });
    }
}

export const createInterview = name => {
    return dispatch => {
        Interviews.add({
            name: name,
            created: _.now()
        }).then(snapshot => {
            dispatch({
                type: CREATE_INTERVIEW,
                interview: snapshot.id
            });
        });
    }
}

export const resetCreateInterview = () => {
    return { type: RESET_CREATE_INTERVIEW };
}

export const deleteInterview = (id, callback) => {
    return dispatch => {
        Interviews.doc(id).delete().then(
            () => callback()
        );
    };
}

export const processVideo = url => {
    // TODO: limit calls
    const PARAMS = 'recognizeinvideo?outputStyle=perFrame';
    let result = null;

    const response = axios({
        method: 'post',
        url: BASE_URL + PARAMS,
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        data: { url: url }
    });

    return {
        type: PROCESS_VIDEO,
        payload: response
    }
}

export const checkStatus = location => {
    // TODO: limit calls
    // const PARAMS = `operations/${location}`;

    const response = axios({
        method: 'get',
        url: location,
        headers: { 'Ocp-Apim-Subscription-Key': KEY }
    });

    return {
        type: CHECK_STATUS,
        payload: response
    }
}