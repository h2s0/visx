import { createBrowserRouter } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { Route } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import WordcloudEx from '@/pages/WordcloudEx';
import RadialBarsEx from '@/pages/RadialBarsEx';
import Example from '@/pages/Example';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route path='wordcloud' element={<WordcloudEx />} />
        <Route path='radialbars' element={<RadialBarsEx/>} />
        <Route path='examples' element={<Example width={1300} height={1300}/>} />
      </Route>
    </>
  )
);

export default router;