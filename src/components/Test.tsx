import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./WSHeader";
import DropSearch from "./DropSearch";
import { TypeAnimation } from "react-type-animation";

const output_text_1 = `Introducing the revolutionary "GlowPro" skincare device,`;

const output_text_2 = `Introducing the revolutionary "GlowPro" skincare device, your ultimate companion for achieving radiant and youthful-looking skin.`;

const output_text_3 = `Introducing the revolutionary "GlowPro" skincare device, your ultimate companion for achieving radiant and youthful-looking skin. With its advanced technology and innovative features, GlowPro takes your skincare routine to the next level. The device utilizes gentle vibrations and LED light therapy to stimulate collagen production, diminish fine lines, and improve skin elasticity. Say goodbye to dullness and hello to a glowing complexion!`;

const output_text_4 = `Introducing the revolutionary "GlowPro" skincare device, your ultimate companion for achieving radiant and youthful-looking skin. With its advanced technology and innovative features, GlowPro takes your skincare routine to the next level. The device utilizes gentle vibrations and LED light therapy to stimulate collagen production, diminish fine lines, and improve skin elasticity. Say goodbye to dullness and hello to a glowing complexion!

But that's not all. GlowPro is designed with convenience in mind. Its compact size and cordless operation make it perfect for on-the-go use.`;

const output_text_5 = `Introducing the revolutionary "GlowPro" skincare device, your ultimate companion for achieving radiant and youthful-looking skin. With its advanced technology and innovative features, GlowPro takes your skincare routine to the next level. The device utilizes gentle vibrations and LED light therapy to stimulate collagen production, diminish fine lines, and improve skin elasticity. Say goodbye to dullness and hello to a glowing complexion!

But that's not all. GlowPro is designed with convenience in mind. Its compact size and cordless operation make it perfect for on-the-go use. Whether you're traveling or simply on a busy schedule, you can easily incorporate this powerful skincare tool into your daily routine. Experience the transformative effects of professional-grade skincare treatments in the comfort of your own home with GlowPro. It's time to unleash your skin's potential and reveal a luminous, youthful glow with the "GlowPro" skincare device. Embrace the future of skincare technology and let your radiance shine through!`;

const Test = () => {
  const [outputMode, setOutputMode] = useState<Boolean>(false);
  const [isCardGridHidden, setIsCardGridHidden] = useState<Boolean>(false);

  const [showWritter, setShowWritter] = useState(false);

  const [prompt, setPrompt] = useState<string>("");

  const [outputResult, setOutputResult] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false)

  interface sItems {
    item: any;
    idx: any;
  }

  const [selectedItem, setSelectedItem] = useState<sItems>({
    item: null,
    idx: null,
  });

  const marketingTitles = [
    "Unleash Your Potential: Discover Our Exclusive Product Line",
    "Revolutionize Your Style: Introducing the New Fashion Collection",
    "Boost Your Productivity: Get Our Innovative Workspace Solutions",
    "Experience Luxury: Indulge in our Exquisite Spa Packages",
    "Transform Your Home: Explore Our Modern Furniture Collection",
    "Ignite Your Fitness Journey: Join Our High-Energy Workout Classes",
    "Upgrade Your Tech: Discover the Latest Gadgets and Accessories",
    "Elevate Your Gaming Experience: Get the Ultimate Gaming Gear",
    "Discover Your Perfect Scent: Explore Our Fragrance Collection",
  ];

  // Generate the grid elements with random blog titles
  const gridElementsTips = marketingTitles.map((title, index) => (
    <div
      key={index}
      className={`bg-blue-50 p-4 text-sm rounded-md select-none cursor-pointer hover:outline outline-blue-500 inset-4 transition-all ${
        outputMode ? "scale-0 translate-y-10" : ""
      }`}
    >
      {title}
    </div>
  ));

  const history = [
    "Unleash Your Potential: Discover the Power of our Revolutionary Product!",
    "Ignite Your Style: Get Ready for a Fashion Revolution with Our Trendsetting Collection!",
    "Fuel Your Adventure: Experience the Ultimate Thrill with Our Action-Packed Outdoor Gear!",
    "Transform Your Home: Dive into Luxury Living with our Exquisite Home Décor Collection!",
  ];

  // Generate the grid elements with random blog titles
  const gridElementsHistory = history.map((title, index) => (
    <div
      key={index}
      className={`bg-yellow-50 p-4 text-sm rounded-md select-none cursor-pointer hover:outline outline-yellow-500 inset-4  transition-all ${
        outputMode ? "scale-0 translate-y-10" : ""
      }`}
    >
      {title}
    </div>
  ));

  const api_map = [
    "http://localhost:4040/api/gentext/blog",
    "http://localhost:4040/api/gentext/marketing/email",
    "http://localhost:4040/api/gentext/marketing/restaurant",
    "http://localhost:4040/api/gentext/marketing/school",
    "http://localhost:4040/generate-post-lstm",
    "http://localhost:4040/generate-post-lstm",
  ];

  const handleGenerate = async (): Promise<any> => {
    setShowWritter(false);
    setOutputMode(true);
    setTimeout(() => {
      setIsCardGridHidden(true);
    }, 1000);
    // const data = {
    //   prompt,
    //   max_len: 500,
    // };
    let data;
    if (selectedItem.idx === 0) data = { prompt, max_len: 500 };
    if (selectedItem.idx === 1) data = { prompt: "", max_len: 500 };
    if (selectedItem.idx === 2) data = { prompt: "", max_len: 500, name: "" };
    if (selectedItem.idx === 3) data = { prompt: "", max_len: 500, name: "" };
    if (selectedItem.idx === 4)
      data = { prompt, numberOfWords: 30, language: "english" };
    if (selectedItem.idx === 5)
      data = { prompt, numberOfWords: 30, language: "assamese" };

    const res = await axios.post(api_map[selectedItem.idx], data);
    console.log(res.data.text);
    setOutputResult(res.data.text);
    setShowWritter(true);
  };

  const onTextChangeHandler = (set: any, text: string): void => {
    set(text);
  };

  return (
    <div>
      <Header />
      <div className="">
        <div className="flex mt-10 px-16">
          <div className="w-1/2 pr-10">
            {/* Main Prompt */}
            <div className="mb-5">
              <label htmlFor="website-url" className="block py-2 text-gray-500">
                Write a promt to get things started
              </label>
              <div className="flex items-center text-gray-400 border rounded-md">
                <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                  Prompt
                </div>
                <input
                  type="text"
                  placeholder="hello world"
                  value={prompt}
                  onChange={(e) => {
                    onTextChangeHandler(setPrompt, e.target.value);
                  }}
                  id="website-url"
                  className="w-full p-2.5 ml-2 bg-transparent outline-none"
                />
              </div>
            </div>
            {/* Model Selector */}
            <div className="mb-5 flex items-end">
              <div className=" w-full">
                <label className="block py-2 text-gray-500">
                  Write a promt to get things started
                </label>
                <DropSearch
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </div>
              <div className="ml-5">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg px-5 py-3"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 pt-10 pl-10">
            <div className="h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer text-center p-4 md:p-8"
              >
                <svg
                  className="w-10 h-10 mx-auto"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                    stroke="#4F46E5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                  Click to{" "}
                  <span className="font-medium text-indigo-600">
                    Upload your file
                  </span>{" "}
                  or drag and drop your file here
                </p>
              </label>
              <input id="file" type="file" className="hidden" />
            </div>
          </div>
        </div>
        <div className={`mt-10 px-16 ${isCardGridHidden ? "hidden" : ""}`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              className={`bg-blue-950 text-white p-4 rounded-md select-none transition-all ${
                outputMode ? "scale-0 translate-y-10" : ""
              }`}
            >
              Our suggestions to get you started →
            </div>
            {gridElementsTips}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
            <div
              className={`bg-yellow-950 text-white p-4 rounded-md select-none transition-all ${
                outputMode ? "scale-0 translate-y-10" : ""
              }`}
            >
              History →
            </div>
            {gridElementsHistory}
          </div>
        </div>
        {showWritter ? (
          <div className="border-t mt-10 px-16 pt-10">
            <TypeAnimation
              repeat={0}
              speed={99}
              style={{
                whiteSpace: "pre-line",
                height: "195px",
                display: "block",
              }}
              sequence={[
                "Generating output.",
                1000,
                "Generating output. Using Model X.",
                1000,
                "Reading data from server.",
                1000,
                outputResult,
                // output_text_1,
                // 1000,
                // output_text_2,
                // 500,
                // output_text_3,
                // 1500,
                // output_text_4,
                // 500,
                // output_text_5,
              ]}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Test;
