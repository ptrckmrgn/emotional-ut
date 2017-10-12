import Firebase from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';

export const FETCH_INTERVIEWS = 'fetch_interviews';
export const FETCH_INTERVIEW = 'fetch_interview';
export const CREATE_INTERVIEW = 'create_interview';
export const RESET_CREATE_INTERVIEW = 'reset_create_interview';
export const DELETE_INTERVIEW = 'delete_interview';

const config = {
    apiKey: 'AIzaSyCzsSGWe-Y455OMj2XbGkY-qZMWj3YERsU',
    authDomain: 'emotional-ut.firebaseapp.com',
    projectId: 'emotional-ut',
    storageBucket: 'emotional-ut.appspot.com'
};
Firebase.initializeApp(config);

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
        const timestamp = _.now();
        Interviews.add({
            created: timestamp,
            modified: timestamp,
            name: name,
            videoFace: null,
            videoScreen: null,
            results: null
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

export const updateInterview = (id, key, value, callback) => {
    return dispatch => {
        Interviews.doc(id).update({
            modified: _.now(),
            [key]: value
        });
    };
}

export const deleteInterview = (id, callback) => {
    return dispatch => {
        Interviews.doc(id).delete().then(
            () => callback()
        );
    };
}