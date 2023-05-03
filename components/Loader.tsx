import Card from './Card';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="!pb-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
      </Card>
    </div>
  );
};

export default Loader;
