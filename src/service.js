import { dataURItoBlob, delay } from "./utils";

const GUESS_API = window.GUESS_API;

const DELAY_INTERVAL = 300;
const MAX_ATTEMPTS = 10;

async function waitForJob(jobId) {
  let attempt = 0;
  const url = `${GUESS_API}/${jobId}`;
  while (true) {
    if (attempt > MAX_ATTEMPTS) {
      throw new Error("Timeout");
    }
    const response = await fetch(url);
    const { status, result } = await response.json();
    switch (status) {
      case "FAILURE":
        throw new Error("Error executing task");
      case "SUCCESS":
        return result;
      default:
        attempt += 1;
        await delay(DELAY_INTERVAL);
    }
  }
}

export async function guessService(imageData) {
  const file = dataURItoBlob(imageData);

  const formdata = new FormData();
  formdata.append("image", file, "image.png");

  const req = await fetch(GUESS_API, {
    method: "POST",
    body: formdata
  });

  const jobId = await req.json();

  if (!jobId) return "Error";

  return await waitForJob(jobId);
}
