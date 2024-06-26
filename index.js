const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: false })
.then(() => {
  server.listen(3001, () => {
    console.log('%s listening at http://localhost:3001', server.name);
  });
})
.catch((err) => console.log(err));