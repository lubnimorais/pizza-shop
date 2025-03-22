import { setupWorker } from 'msw/browser';

export const worker = setupWorker();

export async function enableMSW() {
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  await worker.start();
}
