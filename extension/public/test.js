function startSSE() {
  // 1. 먼저 POST 요청
  fetch("https://8fit.xyz/chat/size", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      content:
        "<div ><span ><ul ><li >cm</li><li >내 사이즈</li><li >M</li><li >L</li><li >XL</li></ul></span><div ><table ><colgroup ><col  style=width: calc(25%);><col  style=width: calc(25%);><col  style=width: calc(25%);><col  style=width: calc(25%);></colgroup><thead ><tr ><th scope=col >총장</th><th scope=col >어깨너비</th><th scope=col >가슴단면</th><th scope=col >소매길이</th></tr></thead><tbody ><tr ><td colspan=4 >사이즈를 직접 입력해주세요</td></tr><tr ><td >68</td><td >48</td><td >56</td><td >60</td></tr><tr ><td >70</td><td >50</td><td >58</td><td >62</td></tr><tr ><td >72</td><td >52</td><td >60</td><td >64</td></tr></tbody></table></div></div>",
      deviceId: "validDeviceId123",
      modelId: 112,
    }),
  })
    .then(() => {
      // 2. POST 요청 성공 후 SSE 연결
      const eventSource = new EventSource("https://8fit.xyz/api/v1/chat/size", {
        withCredentials: true,
      });

      // SSE 이벤트 리스너
      eventSource.onmessage = function (event) {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<p>${event.data}</p>`;
      };

      eventSource.onerror = function (error) {
        console.error("SSE Error:", error);
        eventSource.close();
      };
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
}
