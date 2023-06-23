import React, { useState } from "react";
import Editor from "../components/Editor";
import Header from "../components/WSHeader";
import axios from "axios";

const Edit = () => {
  const [content, setContent] = useState<string>(
    "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>"
  );

  const handleGenerate = async (): Promise<any> => {
    const res = await axios.post("http://localhost:4040/api/gentext/blog", {
      prompt: content,
      max_len: 200,
    });
    console.log(res.data.text);
    setContent((prevText) => prevText + res.data.text);
  };

  return (
    <div>
      <Header />
      <div className="mt-10 px-16">
        <button>Genate with Selected Text</button>
        <button onClick={handleGenerate}>Genate with All</button>
        <Editor con={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default Edit;
