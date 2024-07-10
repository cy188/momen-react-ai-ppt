/* eslint-disable @typescript-eslint/no-explicit-any */

interface AiPptDocProps {
  globalData: Record<string, any>;
  setGlobalData: (newValue: any) => void;
}

export function AiPptDoc({ globalData }: AiPptDocProps) {
  return (
    <div>
      hello world
      ak: {globalData.ak}
      sk: {globalData.sk}
    </div>
  );
}
