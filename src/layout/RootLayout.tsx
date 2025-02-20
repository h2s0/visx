import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <div className='flex flex-col h-screen font-sans'>
      <main className='flex text-black'>
        <div className="flex gap-4">
          <Link to='wordcloud'>Wordcloud</Link>
          <Link to='radialbars'>Ridial Bars</Link>
          <Link to='floatingcards'>Floating Cards</Link>
          <Link to='display'>Display</Link>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout;
