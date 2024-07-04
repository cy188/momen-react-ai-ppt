export interface AiPptDocArgs {
  ak: string;
  sk: string;
}

export const genAiPptDocSrc = ({ ak, sk }: AiPptDocArgs) => `
<html>
  <head></head>
  <body>
    <div>ak: ${ak} , sk: ${sk}</div> 
  </body>
</html>
`;
