import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import React from "react";
import Editor from "@monaco-editor/react";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [HTML, setHTML] = useLocalStorage("HTML", "");
  const [CSS, setCSS] = useLocalStorage("CSS", "");
  const [JS, setJS] = useLocalStorage("JS", "");

  const [active, setActive] = React.useState("HTML");

  const IFRAMECODE = `
    <html>
      <head>
        <style>
          ${CSS}
        </style>
      </head>

      <body>
        ${HTML}

        <script>
          ${JS}
        </script>
      </body>
    </html>
  `;

  return (
    <div className="app-container">
      <h1 className="app-heading">Online Editor</h1>
      <div className="editor-container">
        {/* Editor */}
        <div className="editor">
          <button
            className={`editor-button ${active === "HTML" ? "active" : ""}`}
            onClick={() => setActive("HTML")}
          >
            HTML
          </button>
          <button
            className={`editor-button ${active === "CSS" ? "active" : ""}`}
            onClick={() => setActive("CSS")}
          >
            CSS
          </button>
          <button
            className={`editor-button ${active === "JS" ? "active" : ""}`}
            onClick={() => setActive("JS")}
          >
            JS
          </button>

          {active === "HTML" && (
            <Editor
              height="60vh"
              defaultLanguage="html"
              defaultValue={HTML}
              onChange={(value, event) => setHTML(value)}
            />
          )}

          {active === "CSS" && (
            <Editor
              height="60vh"
              defaultLanguage="css"
              defaultValue={CSS}
              onChange={(value, event) => setCSS(value)}
            />
          )}

          {active === "JS" && (
            <Editor
              height="60vh"
              defaultLanguage="javascript"
              defaultValue={JS}
              onChange={(value, event) => setJS(value)}
            />
          )}
        </div>

        {/* Result */}
        <div className="result">
          <iframe srcDoc={IFRAMECODE} title="result" />
        </div>
      </div>
    </div>
  );
}

export default App;
