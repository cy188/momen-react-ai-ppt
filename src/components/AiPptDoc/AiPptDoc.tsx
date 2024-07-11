/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";

interface AiPptDocProps {
  globalData: Record<string, any>;
  setGlobalData: (newValue: any) => void;
}

const iframeInlineStyle: React.CSSProperties = {
  border: "0px solid",
  height: "100%",
  width: "100%",
};

export function AiPptDoc({ globalData, setGlobalData }: AiPptDocProps) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "CALL_METHOD") {
        setGloablDataFun(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const setGloablDataFun = (payload: any) => {
    console.log("Method called from iframe with payload:", payload);
    setGlobalData({ ...globalData, ak: 1111 });
  };

  return (
    <div>
      <div>
        ak: {globalData.ak} <br />
        sk: {globalData.sk} <br />
      </div>
      <iframe
        ref={iframeRef}
        style={iframeInlineStyle}
        srcDoc={`
        <html>
          <head></head>
          <body>
            <div id="callButton">hello 111<div>
            <script>
              window.onload = function() {
                const callButton = document.getElementById('callButton');
                callButton.onclick = function() {
                  window.parent.postMessage({
                    type: 'CALL_METHOD',
                    payload: 'Hello from iframe!'
                  }, '*'); // 注意：实际应用中应该指定具体的源
                };
              };
            </script>
          </body>
        </html>`}
      />
    </div>
  );
}
