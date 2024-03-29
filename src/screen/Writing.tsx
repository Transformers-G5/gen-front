import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";

import Editor from "../components/Editor";
import Header from "../components/WSHeader";

interface ApplicationData {
  last_updated: string;
  data: object[];
}

const Writing: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const [isTypingShown, setIsTypingShown] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const [typebuffer, setTypebuffer] = useState<string>("");
  const [typeIndex, setTypeIndex] = useState(0);
  const [modelType, setModelType] = useState("model-blog");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    let path;
    if (modelType === "model-blog") {
      path = "http://localhost:4040/api/gentext/blog";
    } else {
      path = "http://localhost:4040/api/gentext/story";
    }
    const res = await axios.post(path, {
      prompt: content,
      max_len: 200,
    });
    console.log(res.data.text);
    setContent((prevText) => prevText + res.data.text);
    // setIsTypingShown(true);
    setTypebuffer(res.data.text);
  };

  const generateUniqueID = (): string => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 100000).toString();
    return timestamp + randomNum;
  };

  const handleSave = (): void => {
    console.log("Saving");
    const currentDateTime: string = getCurrentDateTimeString();
    updateItemInLocalStorage("application_data", {
      id: generateUniqueID(),
      heading: heading,
      description: content,
      date: currentDateTime,
      type: "blog-story",
    });
  };

  const handleGetSelectedText = async (): Promise<any> => {
    const textarea = textareaRef.current;
    let selectedText;
    if (textarea) {
      selectedText = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
      console.log(selectedText);
    }
    if (heading.length === 0) setHeading(content);
    const res = await axios.post("http://localhost:4040/api/gentext/blog", {
      prompt: selectedText,
      max_len: 200,
    });
    console.log(res.data.text);
    setContent((prevText) => prevText + res.data.text);
    // setIsTypingShown(true);
    setTypebuffer(res.data.text);
  };

  const handleModelChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setModelType(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="mt-10 px-16">
        <div className="w-full flex mb-4 border-b ">
          <div className="w-1/2 flex justify-between pr-4 mr-4 border-r pb-4">
            <button
              className="hover:bg-black border text-black hover:text-white px-8 rounded-lg"
              onClick={handleGenerate}
            >
              Generate
            </button>
            <button
              className="hover:bg-black border text-black hover:text-white px-8 rounded-lg"
              onClick={handleGetSelectedText}
            >
              Selective Generate
            </button>
            {/* <button
              className="hover:bg-yellow-700 border border-yellow-700 text-black hover:text-white px-10 rounded-lg"
              onClick={handleSave}
            >
              Edit
            </button> */}
            <button
              className="hover:bg-green-700 border border-green-700 text-black hover:text-white px-10 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div className="w-1/2 pb-4">
            <div>
              <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                  <input
                    type="radio"
                    id="model-blog"
                    name="model"
                    defaultValue="model-blog"
                    className="hidden peer"
                    required
                    onChange={handleModelChange}
                    checked
                  />
                  <label
                    htmlFor="model-blog"
                    className="inline-flex items-center justify-between w-full py-2 px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Blog Mode
                      </div>
                    </div>
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 ml-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="model-story"
                    name="model"
                    defaultValue="model-story"
                    className="hidden peer"
                    onChange={handleModelChange}
                  />
                  <label
                    htmlFor="model-story"
                    className="inline-flex items-center justify-between w-full py-2 px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Story Mode
                      </div>
                    </div>
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 ml-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {heading.length > 0 ? <>{heading}</> : null}
        <textarea
          ref={textareaRef}
          className="w-full focus:outline-0 resize-none overflow-scroll"
          placeholder="start writing here"
          value={content}
          rows={100}
          onChange={(e) => {
            onTextChangeHandler(setContent, e.target.value);
          }}
        />
        {/* {isTypingShown ? (
          <TypeAnimation
            repeat={0}
            speed={99}
            style={{
              whiteSpace: "pre-line",
              height: "195px",
              display: "block",
            }}
            sequence={["Reading data from server.", 1000, content]}
          />
        ) : null} */}
      </div>
    </div>
  );
};

export default Writing;
