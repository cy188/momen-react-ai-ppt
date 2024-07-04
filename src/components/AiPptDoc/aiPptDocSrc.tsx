export interface AiPptDocArgs {
  ak: string;
  sk: string;
}

export const genAiPptDocSrc = ({
  ak,
  sk,
}: AiPptDocArgs) => `<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
    <script src="https://aippt-international-api-static.aippt.cn/aippt-iframe-sdk.js"></script>

  </head>

  <body>
    <div id="aippt-e"></div>  
  </body>

  <script>
    window.onpopstate = function (event) {
      console.log("onpopstate 发生了变化。");
      // event.state 包含了状态对象
      console.log(event.state);
    };

    function generateHmacSHA1Base64(key, data) {
      // 使用crypto-js创建HMAC-SHA1哈希，并直接转换为Base64编码的字符串
      const hmac = CryptoJS.HmacSHA1(data, key);
      return hmac.toString(CryptoJS.enc.Base64);
    }

    function getCurrentTimestampInSeconds() {
      const now = new Date(); // 获取当前时间
      return Math.floor(now.getTime() / 1000); // getTime()返回毫秒时间戳，除以1000转换为秒，并使用Math.floor取整
    }

    const sk = ${sk}; // 密钥

    let times = getCurrentTimestampInSeconds();

    let message = "GET@/api/grant/code/@" + times;

    const hmacSHA1Base64 = generateHmacSHA1Base64(sk, message);

    // 设置请求头
    const headers = new Headers({
      "x-api-key": "66755bc220c7b",
      "x-timestamp": times,
      "x-signature": hmacSHA1Base64,
    });

    let code = "";

    // 使用fetch发送GET请求
    fetch("https://co.aippt.com/api/grant/code?uid=1&channel=", {
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
        xx();
      });

    async function xx() {
      try {
        console.log(code);
        await AipptIframe.show({
          appkey: ${ak},
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

        var element = document.getElementById("aippt-iframe-modal");
        element.style.top = "120px"; // 设置元素的 top 为 20px
      } catch (e) {
        console.log(e);
      }
    }
  </script>
</html>
`;
