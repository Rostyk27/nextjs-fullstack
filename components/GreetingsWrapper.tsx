import Card from './Card';

const GreetingsWrapper = () => {
  return (
    <Card className="w-full pt-8 pb-4">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-5">
            <div className="h-9 bg-gray-300 rounded"></div>
          </div>

          <div className="grid grid-cols-3">
            <div className="h-7 bg-gray-300 rounded"></div>
          </div>

          <div className="grid grid-cols-4">
            <div className="h-14 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GreetingsWrapper;
