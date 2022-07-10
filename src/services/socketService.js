
export default class SocketService {
  constructor(socket, sessionId) {
    this.socket = socket;
    this.sessionId = sessionId;
  }
  sendFinish() {
    this.socket.send(JSON.stringify({
      type: 'draw',
      id: this.sessionId,
      figure: {type: 'finish'}
    }))
  }
  sendClear() {
    this.socket.send(JSON.stringify({
      type: 'clear',
      id: this.sessionId
    }))
  }
  sendDraw(figure) {
    this.socket.send(JSON.stringify({
      type: 'draw',
      id: this.sessionId,
      figure
    }))
  }

  // static sendFinish = (socket, sessionId) => {
  //   socket.send(JSON.stringify({
  //     type: 'draw',
  //     id: sessionId,
  //     figure: {type: 'finish'}
  //   }))
  // }
  // static sendClear = (socket, sessionId) => {
  //   socket.send(JSON.stringify({
  //     type: 'clear',
  //     id: sessionId
  //   }))
  // }
  // static sendDraw = (socket, sessionId, figure) => {
  //   socket.send(JSON.stringify({
  //     type: 'draw',
  //     id: sessionId,
  //     figure
  //   }))
  // }
}

