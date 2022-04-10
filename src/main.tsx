import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/components';
import { setupMockWorker } from '@/utils/mocks';

const container = document.getElementById('root')!;
const root = createRoot(container);

if (import.meta.env.VITE_API_MOCK === 'true') {
  const worker = setupMockWorker();
  worker.start();
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
