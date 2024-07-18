/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { genAiPptDocSrc } from './AiPptDocSrc';

interface AiPptDocProps {
  globalData: Record<string, any>;
  setGlobalData: (newValue: any) => void;
}

const iframeInlineStyle: React.CSSProperties = {
  border: "0px solid",
  height: "100%",
  width: "100%",
};

const divStyle: React.CSSProperties = {
  height: "calc(100vh - 60px)",
  width: "100%",
  overflow: "hidden",
  position: "fixed",
  top: "56px",
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
    <div style={divStyle}>
      <div>
        globalData curr_account_id: {globalData.curr_account_id}
        globalData sha1code: {globalData.sha1code}
      </div>
      <iframe
        ref={iframeRef}
        style={iframeInlineStyle}
        srcDoc={genAiPptDocSrc({
          curr_account_id: globalData.curr_account_id,
          sha1code: globalData.sha1code,
        })}
      />
    </div>
  );
}
