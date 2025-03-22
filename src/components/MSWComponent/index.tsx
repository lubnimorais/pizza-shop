'use client';
import { useEffect } from 'react';

import { setupWorker } from 'msw/browser';

export const MSWComponent = () => {
  const worker = setupWorker();

  useEffect(() => {
    async function enableMSW() {
      if (process.env.NODE_ENV !== 'test') {
        return;
      }

      await worker.start();
    }

    enableMSW();
  }, [worker]);

  return null;
};
