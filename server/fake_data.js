var csvWriter = require("csv-write-stream");
var fs = require("fs");
var faker = require("faker");

var writer = csvWriter();
writer.pipe(fs.createWriteStream("./dataset/out.csv", { flags: "a" }));
for (let i = 0; i < 5000000; i++) {
  let fakeData = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  };
  writer.write(fakeData);
}
writer.end();
