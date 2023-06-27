import React, { FC, useEffect, useState, useContext } from "react";
import parse from "html-react-parser";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

import Header from "../components/WSHeader";
import { workerData } from "worker_threads";

const data_fake = [
  {
    heading: "Revolutionize Your Business with Cutting-Edge Solutions",
    description:
      "Unlock unprecedented growth and efficiency with our state-of-the-art technology suite. Stay ahead of the competition and achieve unparalleled success.",
    date: "2023-05-24",
  },
  {
    heading: "Boost Your Online Presence with Expert Digital Marketing",
    description:
      "Maximize your brand visibility and drive targeted traffic to your website. Our digital marketing experts employ proven strategies to amplify your online reach.",
    date: "2023-05-23",
  },
  {
    heading: "Discover the Ultimate Luxury Experience",
    description:
      "Indulge in opulence like never before. Immerse yourself in an exclusive world of luxury with our meticulously crafted offerings that redefine sophistication.",
    date: "2023-05-22",
  },
  {
    heading: "Transform Your Home into a Tranquil Oasis",
    description:
      "Escape the ordinary and create a serene sanctuary within your own home. Experience tranquility and rejuvenation with our exquisite range of home decor.",
    date: "2023-05-21",
  },
  {
    heading: "Unleash Your Creativity with Innovative Art Supplies",
    description:
      "Unleash your inner artist and bring your imagination to life. Our innovative art supplies empower creativity and enable you to express yourself like never before.",
    date: "2023-05-20",
  },
  {
    heading: "Master the Art of Culinary Delights",
    description:
      "Embark on a culinary journey and elevate your cooking skills to new heights. Discover our premium ingredients and expert techniques for exquisite gourmet dishes.",
    date: "2023-05-19",
  },
  {
    heading: "Achieve Your Fitness Goals with Personalized Training",
    description:
      "Take charge of your fitness journey with our tailored training programs. Our certified trainers will guide and motivate you to achieve your desired fitness goals.",
    date: "2023-05-18",
  },
  {
    heading: "Stay Connected Anywhere with Lightning-Fast Internet",
    description:
      "Experience uninterrupted connectivity with our lightning-fast internet services. Stream, browse, and connect with ease, no matter where you are.",
    date: "2023-05-17",
  },
  {
    heading: "Discover the Perfect Blend of Style and Comfort",
    description:
      "Step into a world of effortless elegance with our fashion-forward collection. Embrace comfort without compromising on style with our curated designs.",
    date: "2023-05-16",
  },
  {
    heading: "Experience Adventure Like Never Before",
    description:
      "Embark on thrilling adventures that push boundaries and ignite your sense of exploration. Get ready to create unforgettable memories and conquer new horizons.",
    date: "2023-05-15",
  },
];

interface MyComponentProps {
  head: string;
  desc: string;
  date: string;
}

const removeHtmlTags = (text: string): string => {
  return text.replace(/<[^>]+>/g, "");
};

const ContentPreviewCard: React.FC<MyComponentProps> = ({
  head,
  desc,
  date,
}) => {
  const truncateString = (str: string): string => {
    if (str.length > 150) {
      return `${str.slice(0, 150)}...`;
    } else {
      return str;
    }
  };

  return (
    <div className="max-w-sm border border-gray-200 border-t-4 border-t-orange-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col justify-between cursor-pointer">
      <div className="">
        <a href="#">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {removeHtmlTags(head)}
          </h5>
        </a>
        <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
          {truncateString(removeHtmlTags(desc))}
        </p>
      </div>
      <div className="">
        <div className="text-xs text-gray-600">{date}</div>
      </div>
    </div>
  );
};

interface StoredData {
  heading: string;
  description: string;
  date: string;
  id: string;
}

type StoredDataArray = StoredData[];

const Gallery = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<StoredDataArray>([]);
  const [selectedHeading, setSelectedHeading] = useState<string>("");
  const [selectedBody, setSelectedBody] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedUid, setSelectedUid] = useState<string>("");

  const { workData, setWorkData } = useContext(DataContext);

  const getItemFromLocalStorage = (key: string): any => {
    const itemString: string | null = localStorage.getItem(key);

    if (itemString) {
      try {
        const parsedItem: any = JSON.parse(itemString);
        return parsedItem;
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }

    return null;
  };

  useEffect(() => {
    const retrievedItem: any = getItemFromLocalStorage("application_data");
    // console.log(retrievedItem.data);
    if (retrievedItem) setData(retrievedItem.data);
  }, []);

  const handleEdit = (): void => {
    let data: any;
    if (workData == null) {
      data = [];
    } else {
      data = workData;
    }
    data?.push({
      uid: selectedUid,
      body: selectedBody,
      title: selectedHeading,
    });
    setWorkData(data);
    navigate("/work/editor");
  };

  return (
    <div className="h-full">
      <Header />
      <div className="flex h-[90%]">
        <div className="w-1/2 py-12 px-16 grid grid-cols-2 gap-6 overflow-y-scroll">
          {data.map((item) => (
            <div
              onClick={() => {
                setSelectedHeading(item.heading);
                setSelectedBody(item.description);
                setSelectedDate(item.date);
                setSelectedUid(item.id);
              }}
            >
              <ContentPreviewCard
                head={item.heading}
                desc={item.description}
                date={item.date}
              />
            </div>
          ))}
        </div>
        <div className="w-1/2 border-l p-12">
          {selectedBody.length > 0 ? (
            <>
              <button onClick={handleEdit} className="mb-8">
                Edit
              </button>
              {/* <button onClick={handleEdit} className="mb-8 ml-10">
                Delete
              </button> */}
              <h1 className="text-2xl font-bold">{parse(selectedHeading)}</h1>
              <p>{parse(selectedBody)}</p>
            </>
          ) : (
            <div className="text-gray-400 flex justify-center items-center h-full">
              select to get preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
