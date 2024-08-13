export class WebSocketAPI {
  constructor(onMessage) {
    this.url = process.env.REACT_APP_UPBIT_WSS;
    this.socket = null;
    this.onMessage = onMessage;
  }

  connect() {
    if (!this.url) {
      console.error(
        "WebSocket URL is undefined. Check your .env configuration."
      );
      return;
    }

    this.socket = new WebSocket(this.url);
    this.socket.binaryType = "blob"; // Blob 형식으로 데이터를 받도록 설정
    this.socket.onopen = () => {
      this.sendMessage([
        { ticket: "ticker" }, // 'ticker'라는 티켓 이름 설정
        { type: "ticker", codes: ["KRW-BTC", "KRW-ETH"] }, // 'KRW-BTC'와 'KRW-ETH'의 시세 정보를 요청하는 메시지
        { format: "DEFAULT" }, // 응답 형식을 기본 형식으로 요청
      ]);
    };

    this.socket.onmessage = this.handleMessage.bind(this); // 이벤트 핸들러 분리 및 바인딩
    this.socket.onopen = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    // this.socket.onclose = this.handleClose.bind(this);
  }

  handleMessage(event) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (this.onMessage) {
          this.onMessage(data);
        }
      } catch (error) {
        console.error("Error parsing JSON: ", error);
      }
    };
    reader.onerror = (error) => {
      console.error("FileReader error: ", error);
    };
    reader.readAsText(event.data);
  }

  handleError(error) {
    console.error("WebSocket error: ", error);
  }

  handleClose(event) {
    console.log("WebSocket connection closed: ", event);
  }

  sendMessage(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.log("WebSocket is not open. Message not sent.");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
