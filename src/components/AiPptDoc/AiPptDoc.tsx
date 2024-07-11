/* eslint-disable @typescript-eslint/no-explicit-any */

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
  function handleClick() {
    setGlobalData({ ...globalData, ak: 1111 });
  }
  return (
    <div>
      <div>
        ak: {globalData.ak} <br />
        sk: {globalData.sk} <br />
      </div>
      <iframe
        style={iframeInlineStyle}
        srcDoc={`
        <html>
          <head></head>
          <body>
            <div onclick="${handleClick()}">hello 111<div>
          </body>
        </html>`}
      />
    </div>
  );
}
