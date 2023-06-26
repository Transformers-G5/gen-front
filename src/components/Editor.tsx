import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  onChange: React.Dispatch<React.SetStateAction<string>>
}

function Editor(props: Content) {
  // const [value, setValue] = useState("");

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
        onChange={props.onChange}
      />
    </div>
  );
}

export default Editor;
