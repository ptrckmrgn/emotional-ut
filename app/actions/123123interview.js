import Firebase from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';

export const DELETE_INTERVIEW = 'delete_interview';

const Interviews = Firebase.firestore().collection('interviews');
const Storage = Firebase.storage().ref();

export const  = (id, type, file) => {
    const uploadTask = Storage.child(`${id}/${type}`).put(file);
    uploadTask.on('state_changed', snapshot => {
            const transferred = _.round(snapshot.bytesTransferred / 1000000);
            const totalSize = _.round(snapshot.totalBytes / 1000000);
            const progress = _.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            this.setState({ transferred, totalSize, progress });

            switch (snapshot.state) {
                case Firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case Firebase.storage.TaskState.RUNNING: // or 'running'
                    this.setState({ running: true });
                break;
            }
        }, error => {
            // TODO: implement errors properly
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, () => {
            Interviews.doc(id).update({
                [type]: uploadTask.snapshot.downloadURL
            });
        }
    );
}
