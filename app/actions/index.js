import axios from 'axios';

export const PROCESS_VIDEO = 'process_video';

const BASE_URL = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/';
const KEY = '4cef4190845e41fe9d2930a3ef56698e';

export const processVideo = () => {
    const PARAMS = 'recognizeinvideo?outputStyle=perFrame';

    const result = axios.post(BASE_URL + PARAMS, {
        timeout: 1000,
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        data: { 'url': 'https://github.com/ptrckmrgn/emotional-ut/blob/master/20170916_163632.mp4?raw=true' }
    });

    console.log(result);

    return {
        type: PROCESS_VIDEO,
        payload: result
    }
}

// export function fetchPhotos() {
//     // const photos = axios.get(`${ROOT_URL}/photos/random/${CLIENT_ID}&count=${MAX_PHOTOS}`);
//     const photos = axios.get('../../resources/test.json');
//
//
//     return {
//         type: FETCH_PHOTOS,
//         payload: photos
//     };
// }
//
// export function selectPhoto(id) {
//     return {
//         type: SELECT_PHOTO,
//         payload: id
//     };
// }