import { useState } from "react";
import ReactQuill from "react-quill";

function App() {
  const [selectedHtml, setSelectedHtml] = useState("");

  const getFile = (files: FileList) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        setSelectedHtml(text);
      }
    };
    reader.readAsText(files[0]);
  };

  const onClickDownload = (): void => {
    const date = new Date();
    const filename = `newFile-${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}.html`;
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <div style={{ padding: 10 }}>
        <input
          type="file"
          onChange={(e): void => {
            e.target.files && getFile(e.target.files);
          }}
          accept=".html"
        />
        <button onClick={onClickDownload}>다운로드</button>
      </div>
      <hr />
      <ReactQuill
        theme="snow"
        value={selectedHtml}
        onChange={setSelectedHtml}
      />
    </div>
  );
}

export default App;
