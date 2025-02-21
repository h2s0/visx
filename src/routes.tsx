import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import WordcloudEx from '@/pages/WordcloudEx';
import RadialBarsEx from '@/pages/RadialBarsEx';
import FloatingCards from '@/pages/FloatingCards';
import Display from '@/pages/Display';
import TeamInfo from '@/pages/TeamInfo';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route path='wordcloud' element={<WordcloudEx />} />
        <Route path='radialbars' element={<RadialBarsEx/>} />
        <Route path='floatingcards' element={<FloatingCards/>} />
        <Route path='display' element={<Display/>} />
        <Route path='teamInfo' element={<TeamInfo/>} />
      </Route>
    </>
  )
);

export default router;