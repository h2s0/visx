import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <main className='flex flex-col text-black font-[LeferiPoint-WhiteObliqueA]'>
      <div className="flex gap-5 p-5 font-bold">
        <Link to='wordcloud'>Wordcloud</Link>
        <Link to='radialbars'>Radial Bars</Link>
        <Link to='floatingcards'>Floating Cards</Link>
        <Link to='display'>Display</Link>
        <Link to='teamInfo'>Team Information</Link>
      </div>
      <Outlet />
    </main>
  )
}

export default RootLayout;