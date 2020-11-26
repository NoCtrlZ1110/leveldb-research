const csv = require('csv-parser');
const fs = require('fs');
var db = require('./db');

module.exports = (server) => {
  let io = require('socket.io').listen(server);

  const namespace = io.of('socket');

  let countInserted = 0;

  const autoInsert = (socket, number) => {
    let count = 0;
    let data = '';
    namespace.emit('length', number);

    let logInfo = setInterval(
      () => {
        namespace.emit('log', data);
        namespace.emit('logCount', countInserted);
        console.log(count);
      },
      number > 999999 ? 500 : 100
    );

    let errMsg = null;

    let readStream = fs
      .createReadStream('./dataset/out.csv')
      .on('error', (err) => {
        console.log('ERR' + err.message);
        socket.emit('log', err.message);
        errMsg = err.message;
        readStream.end();
      })
      .pipe(csv())

      .on('data', (row) => {
        count++;
        data = row;
        let key = 'level#' + count;
        insert(socket, key, row);
        if (count > number) {
          readStream.end();
        }
      })

      .on('end', () => {
        console.log('End stream!');
        clearInterval(logInfo);
        if (errMsg) return;
        else socket.emit('log', 'Import successfully ' + number + ' records!');
      });
  };

  const insert = (socket, key, data) => {
    db.put(key, data, (err, value) => {
      if (err) {
        socket.emit('log', err.message);
        return;
      }
      countInserted++;
    });
  };

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
    socket.on('autoInsert', (number) => {
      countInserted = 0;
      autoInsert(socket, number);
      console.log(number);
    });

    socket.on('disconnect', () => {
      handleDisconnect(socket);
    });
  });

  return io;
};
