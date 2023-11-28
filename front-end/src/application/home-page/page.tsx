import Body from "./Body";
import Header from "./Header";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-red-200 pt-10 px-5 rounded-bl-xxxl rounded-br-xxxl overflow-hidden">
        <Header />
      </div>
      <div className="my-20">
        <Body />
      </div>
    </div>
  );
};

export default HomePage;
