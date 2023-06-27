import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { TypeAnimation } from "react-type-animation";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Editor from "../components/Editor";
import Header from "../components/WSHeader";

interface ApplicationData {
  last_updated: string;
  data: object[];
}

const Edit: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const [isTypingShown, setIsTypingShown] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const [typebuffer, setTypebuffer] = useState<string>("");
  const [typeIndex, setTypeIndex] = useState(0);
  const [tabindex, setTabindex] = useState(0);

  const { workData, setWorkData } = useContext(DataContext);

  const checkAndCreateLocalStorageItem = (): void => {
    const key: string = "application_data";
    const itemString: string | null = localStorage.getItem(key);

    if (!itemString) {
      // Create a new item if it's not found
      const initialData: ApplicationData = {
        last_updated: "",
        data: [],
      };
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  };

  useEffect(() => {
    checkAndCreateLocalStorageItem();
  }, []);

  const getCurrentDateTimeString = (): string => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}`;

    return dateTimeString;
  };

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

  const updateItemInLocalStorage = (key: string, newItem: object): void => {
    const itemString: string | null = localStorage.getItem(key);

    if (itemString) {
      try {
        const parsedItem: ApplicationData = JSON.parse(itemString);
        parsedItem.data.push(newItem);
        const updatedItemString: string = JSON.stringify(parsedItem);
        localStorage.setItem(key, updatedItemString);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

  const onTextChangeHandler = (set: any, text: string): void => {
    set(text);
  };

  const handleGenerate = async (): Promise<any> => {
    if (heading.length === 0) setHeading(content);
    const res = await axios.post("http://localhost:4040/api/gentext/blog", {
      prompt: content,
      max_len: 200,
    });
    console.log(res.data.text);
    setContent((prevText) => prevText + res.data.text);
    // setIsTypingShown(true);
    setTypebuffer(res.data.text);
  };

  const handleSave = (index: any): void => {
    console.log("Saving");
    const currentDateTime: string = getCurrentDateTimeString();

    const itemString: string | null = localStorage.getItem("application_data");

    if (itemString) {
      try {
        let parsedItem: ApplicationData = JSON.parse(itemString);
        for (let i = 0; i < parsedItem.data.length; i++) {
          const item: any = parsedItem.data[i];
          if (workData)
            if (item.id === workData[tabindex].uid) {
              console.log(workData[tabindex]);
              const data = {
                id: item.id,
                heading: workData[tabindex].title,
                description: workData[tabindex].body,
                date: item.id.date,
                type: item.id.type,
              };
              parsedItem.data[i] = data;
              const updatedItemString: string = JSON.stringify(parsedItem);
              localStorage.setItem("application_data", updatedItemString);
            }
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="">
        {workData !== null ? (
          <Tabs>
            <div className="flex justify-between items-center">
              <TabList>
                {workData.map((item, index) => {
                  return (
                    <Tab
                      onClick={() => {
                        setTabindex(index);
                      }}
                    >
                      {item.title}
                    </Tab>
                  );
                })}
              </TabList>
              <div className="mr-12">
                {/* <button
                  className="bg-black hover:bg-gray-600 text-white font-bold px-6 text-sm  py-2 rounded-lg mr-4"
                  onClick={handleSave}
                >
                  Close
                </button> */}
                <button
                  className="bg-black hover:bg-gray-600 text-white font-bold px-6 text-sm  py-2 rounded-lg"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>

            {workData.map((item, index) => {
              return (
                <TabPanel>
                  <Editor
                    con={item.body}
                    onChange={setWorkData}
                    index={index}
                  />
                </TabPanel>
              );
            })}
          </Tabs>
        ) : null}
      </div>
    </div>
  );
};

export default Edit;
