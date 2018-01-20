import Firebase from 'firebase';

const UploadFile = (id, subId, file, type) => {
    console.log('uploading!');
    // const extension = file.name.split('.').pop();
    const uploadTask = Firebase.storage().ref()
        .child(`${id}-${subId}.${type}`)
        .put(file);

    return uploadTask;
}

export default UploadFile;