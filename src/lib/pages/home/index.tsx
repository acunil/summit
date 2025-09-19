import { Game } from '@/components/game';

const Home = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <Game />
    </div>
  );
};

export default Home;
