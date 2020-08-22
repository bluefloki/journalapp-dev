import React, { useMemo, useState, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useGlobalContext } from "../context/GlobalContext";

function Editor() {
  const { setWordCount } = useGlobalContext();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("content")) || [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]
  );
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        let content = JSON.stringify(value);
        localStorage.setItem("content", content);
        const fullText = value
          .map((value) => value.children)
          .map((child) => child[0]["text"])
          .filter((text) => text !== "");
        setWordCount(fullText.join(" "));
      }}
    >
      <Editable placeholder="What is on your mind..." autoFocus />
    </Slate>
  );
}

export default Editor;
