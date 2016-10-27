var port = require(__dirname + "/port");

module.exports = {
  app: {
    name: "littleboy"
  },
  port: port("HTTP/WEB-SOCKET"),
  tcpPort: port("TCP"),
  apps: {
    terminalPort: port("TERMINAL-APP"),
    reverseSshUsername: "",
    reverseSshStun: "",
    reverseTcpPassword: ""
  },
  sms: {
    active: false,
    sid: "",
    token: "",
    user: "",
    masterNumber: ""
  },
  mail: {
    connection: {
      service: 'Gmail',
      auth: {
        user: '',
        pass: ''
      }
    },
    masterMail: ""
  },
  sshJumper: port("SSH-JUMPER"),
  defaultSsh: 22,
  ipCheckInterval: 600000, // 1min
  watcherInterval: 600000  // 1min
};
