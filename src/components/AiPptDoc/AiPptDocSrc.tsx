export interface AiPptDocArgs {
  curr_account_id: string
  uiiadf9891: string
}

export const genAiPptDocSrc = ({
  curr_account_id,
  uiiadf9891
}: AiPptDocArgs) => `<html lang="en" style="width:calc(100vw - 60px);height:100%;overflow: hidden;">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
            <script src="https://aippt-international-api-static.aippt.cn/aippt-iframe-sdk.js"></script>
            <title>Document</title>
          </head>
          <body style="width: 100%;height:100%;">
            <div id="aippt-e" style="width: 100vw;height:100%;"></div>
          </body>
          <script>
          function gwrwerfadfa(key, data) {
            // 使用crypto-js创建HMAC-SHA1哈希，并直接转换为Base64编码的字符串
            const hmac = CryptoJS.HmacSHA1(data, key);
            return hmac.toString(CryptoJS.enc.Base64);
          }
          function getCurrentTimestampInSeconds() {
            const now = new Date() // 获取当前时间
            return Math.floor(now.getTime() / 1000) // getTime()返回毫秒时间戳，除以1000转换为秒，并使用Math.floor取整
          }
          let uiiadf9891 = "${uiiadf9891}"
          let times = getCurrentTimestampInSeconds()
          let acccount_id = ${curr_account_id}
          console.log('time: ', times)
          let message = "GET@/api/grant/code/@ " + times;
          const fadfg2resfsdf = gwrwerfadfa(uiiadf9891, message);
          // 设置请求头
          const headers = new Headers({
            "x-api-key": "66755bc220c7b",
            "x-timestamp": times,
            "x-signature": fadfg2resfsdf,
          });
          let code = "";
          // 使用fetch发送GET请求
          fetch("https://co.aippt.com/api/grant/code?uid=${curr_account_id}&channel=", {
            method: "GET", // 显式设置请求方法为GET
            headers: headers, // 传入上面创建的headers对象
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // 假设服务器响应的是JSON格式数据
            })
            .then((data) => {
              console.log("data: ", data); // 处理解析后的JSON数据
              code = data.data.code;

              // 执行下面的函数
              frame();
            });

            async function frame() {
              try {
                console.log(code);
                await AipptIframe.show({
                  appkey: "66755bc220c7b",
                  channel: "",
                  code: code,
                  editorModel: true,
                  scene_auth: false,
                  container: document.getElementById("aippt-e"),
                  onMessage(eventType, data) {
                    console.log(eventType, data);
                    if (eventType == "CHARGING") {
                      console.log("扣费啦: ", data);
                    }
                  },
                  options: {
                    fc_plate: [2003, 2011, 2014, 2024],
                  },
                });
            } catch (e) {
              console.log(e);
            }
          }
          </script>
        </html>
`;
