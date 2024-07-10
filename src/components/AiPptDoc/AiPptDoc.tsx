/* eslint-disable @typescript-eslint/no-explicit-any */

interface AiPptDocProps {
  globalData: Record<string, any>;
  setGlobalData: (newValue: any) => void;
}

export function AiPptDoc({ globalData,setGlobalData }: AiPptDocProps) {
  function handleClick() {
    setGlobalData({...globalData,ak: 1111})
  }
  return (
    <div>
      hello world
      ak: {globalData.ak} <br />
      sk: {globalData.sk} <br />
      <button onClick={handleClick}>设置全局数据ak为: 1111</button>
    </div>
  );
}
