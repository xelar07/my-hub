import { Suspense } from 'react';
import VideoPage from './VideoPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando video...</div>}>
      <VideoPage />
    </Suspense>
  );
}
