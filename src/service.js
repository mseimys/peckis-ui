import { dataURItoBlob } from './utils';

const GUESS_API = window.GUESS_API;

export async function guessService(imageData) {
  const file = dataURItoBlob(imageData);

  const formdata = new FormData();
  formdata.append('image', file, 'image.png');

  const req = await fetch(GUESS_API, {
    method: "POST",
    body: formdata
  });
    
  return await req.json();
}
