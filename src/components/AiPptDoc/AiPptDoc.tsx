/* eslint-disable @typescript-eslint/no-explicit-any */

interface AiPptDocProps {
  globalData: Record<string, any>;
  setGlobalData: (newValue: any) => void;
}

export function AiPptDoc({ globalData }: AiPptDocProps) {
  // function handleClick() {
  //   setGlobalData({ ...globalData, ak: 1111 });
  // }
  return (
    <div>
      <div>
        ak: {globalData.ak} <br />
        sk: {globalData.sk} <br />
      </div>
      <iframe
        srcDoc={`
        <html>
          <head></head>
          <body>
            <div>hello 111<div>
          </body>
        </html>`}
      />
    </div>
  );
}
