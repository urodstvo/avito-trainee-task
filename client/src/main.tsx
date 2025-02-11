import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className='bg-black text-xl'>demo</div>
    </StrictMode>
);
