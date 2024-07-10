/* eslint-disable @typescript-eslint/no-explicit-any */

interface AiPptDocProps {
  globalData: Record<string, any>;
  setGlobalData: (newValue: any) => void;
}

export function AiPptDoc({ globalData,setGlobalData }: AiPptDocProps) {
  function handleClick() {
    setGlobalData(111)
  }
  return (
    <div>
      hello world
      ak: {globalData.ak}
      sk: {globalData.sk}
      <button onClick={handleClick}>设置全局数据</button>
    </div>
  );
}
