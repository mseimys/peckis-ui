import { dataURItoBlob } from './utils';


export async function guessService(imageData) {
  const file = dataURItoBlob(imageData);

  const formdata = new FormData();
  formdata.append('image', file, 'image.png');

  const req = await fetch('http://localhost:5000/guess', {
    method: 'POST',
    body: formdata,
  });
    
  return await req.json();
}
