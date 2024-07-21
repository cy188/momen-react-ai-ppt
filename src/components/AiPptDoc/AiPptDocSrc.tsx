export interface AiPptDocArgs {
  curr_account_id: string
  uiiadf9891: string
}

export const genAiPptDocSrc = ({
  curr_account_id,
  uiiadf9891
}: AiPptDocArgs) => `<html
  lang="en"
  style="width: calc(100vw - 60px); height: 100%; overflow: hidden"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
    <script src="https://aippt-international-api-static.aippt.cn/aippt-iframe-sdk.js"></script>
    <title>Document</title>
  </head>
  <body style="width: 100%; height: 100%">
    <div id="aippt-e" style="width: 100vw; height: 100%"></div>
  </body>
  <script>
    function generateHmacSHA1Base64(key, data) {
      const hmac = CryptoJS.HmacSHA1(data, key);
      return hmac.toString(CryptoJS.enc.Base64);
    }

    function getCurrentTimestampInSeconds() {
      const now = new Date(); 
      return Math.floor(now.getTime() / 1000); 
    }

    const sk = "${uiiadf9891}";

    let times = getCurrentTimestampInSeconds();

    console.log("time: ", times);

    let message = "GET@/api/grant/code/@" + times;

    const hmacSHA1Base64 = generateHmacSHA1Base64(sk, message);

    console.log("hash: ", hmacSHA1Base64);
    const headers = new Headers({
      "x-api-key": "66755bc220c7b",
      "x-timestamp": times,
      "x-signature": hmacSHA1Base64,
    });

    let code = "";
    fetch("https://co.aippt.com/api/grant/code?uid=${curr_account_id}&channel=", {
      method: "GET", 
      headers: headers, 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log("data: ", data); 
        code = data.data.code;

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
            if (eventType == "GENERATE_PPT_SUCCESS") {

              const url =
                "https://villa.momen.app/zero/KrABb5MqgdE/callback/bd6b10b2-5572-471a-a21a-49a31452d389";

              const data = {
                actionflow_dir: "/",
                actionflow_name: "fh76saj19kf0sfdl6k9",
                payload: {
                  hufidl71lj9nm5k3j1: ${curr_account_id},
                },
              };
              const body = JSON.stringify(data);
              const options = {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json", 
                },
                body: body, 
              };


              fetch(url, options)
                .then((response) => {
                  return response.json(); 
                })
                .then((data) => {
                });
            }
          },
          options: {
            fc_plate: [2003, 2011, 2014, 2024],
          },
        });

        var element = document.getElementById("aippt-iframe-modal");
        element.style.top = "120px";
      } catch (e) {
        console.log(e);
      }
    }
  </script>
</html>

`;
