var db = require('./db');

const getDataByKey = (socket, key) => {
  db.get(key, (err, value) => {
    if (err) {
      socket.emit('log', err.message);
      return;
    }
    socket.emit('log', value);
  });
};

const insertDataByKey = (socket, key, data) => {
  db.put(key, data, (err, value) => {
    if (err) {
      socket.emit('log', err.message);
      return;
    }
    socket.emit('log', `Inserted "${data}" as key "${key}"`);
  });
};

const deleteDataByKey = (socket, key) => {
  db.del(key, (err, value) => {
    if (err) {
      socket.emit('log', err.message);
      return;
    }
    socket.emit('log', `Deleted ${key} key!`);
  });
};

module.exports = (server) => {
  let io = require('socket.io').listen(server);

  const namespace = io.of('socket');

  const handleConnection = (client) => {
    console.log(`Client connected: ${client.id}`);
  };

  const handleDisconnect = (client) => {
    console.log(`Client disconnected: ${client.id}`);
  };

  namespace.on('connection', function (socket) {
    handleConnection(socket);

    socket.on('getData', (key) => {
      getDataByKey(socket, key);
    });

    socket.on('putData', (key, data) => {
      insertDataByKey(socket, key, data);
    });

    socket.on('delData', (key) => {
      deleteDataByKey(socket, key);
    });

    socket.on('disconnect', () => {
      handleDisconnect(socket);
    });
  });

  return io;
};
