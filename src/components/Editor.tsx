import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { DataContext } from "../context/DataProvider";

interface CurrentWorkT {
  uid: string;
  body: string;
  title: string;
}

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

interface Content {
  con: string | undefined;
  onChange: (object: CurrentWorkT[] | null) => void;
  index: number;
}

function Editor(props: Content) {
  // const [value, setValue] = useState("");
  const { workData, setWorkData } = useContext(DataContext);

  // useEffect(() => {
  //   setValue(props.con);
  // }, [props.con]);

  return (
    <div>
      <ReactQuill
        className="bg-white dark:bg-gray-800"
        modules={modules}
        theme="snow"
        value={props.con}
        onChange={(e) => {
          if (workData !== null) {
            let data = workData;
            data[props.index].body = e;
            setWorkData(data);
          }
        }}
      />
    </div>
  );
}

export default Editor;
