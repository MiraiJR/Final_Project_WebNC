const Footer = () => {
  return (
    <div className="container mx-auto flex items-center justify-center flex-col gap-5">
      <h2 className="">Subscribe to get our Newsletter</h2>
      <div className="flex flex-row gap-4">
        <input
          placeholder="Your email"
          className="rounded-sm py-2 px-4 text-black"
        />
        <button className="bg-blue-700 py-2 px-4 rounded-lg">Subcribe</button>
      </div>
    </div>
  );
};

export default Footer;
