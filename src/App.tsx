import { Home, Search, PlusSquare, Clapperboard, User, Cat } from 'lucide-react';
import ReelsFeed from './components/ReelsFeed';
import { ReloadPrompt } from './components/ReloadPrompt';

const Navigation = () => {
  const navItems = [
    { id: 'home', icon: Home, disabled: true },
    { id: 'search', icon: Search, disabled: true },
    { id: 'add', icon: PlusSquare, disabled: true },
    { id: 'reels', icon: Clapperboard, active: true },
    { id: 'profile', icon: User, disabled: true }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 w-full max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            disabled={item.disabled}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              item.active 
                ? 'text-white' 
                : item.disabled 
                  ? 'text-gray-600 cursor-not-allowed opacity-50' 
                  : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon size={28} className={item.active ? 'fill-white' : ''} />
          </button>
        ))}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden flex justify-center">
      <div className="w-full max-w-md bg-black relative shadow-2xl h-screen flex flex-col">
        {/* Top Header overlay for Reels feed */}
        <header className="absolute top-0 left-0 right-0 z-50 pt-safe px-4 py-3 flex items-center space-x-2 pointer-events-none">
          <Cat size={24} className="text-white drop-shadow-md" />
          <h1 className="text-2xl font-bold text-white tracking-tighter drop-shadow-md">CatGram</h1>
        </header>

        {/* Main Feed */}
        <main className="flex-1 w-full h-full">
          <ReelsFeed />
        </main>

        <Navigation />
        <ReloadPrompt />
      </div>
    </div>
  );
};

export default App;
