const LineByLineReader = require('line-by-line');
const cassandra = require('cassandra-driver');
const db = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'reviews' });

const start = Date.now();
const run = async () => {
  db.execute(`
  CREATE KEYSPACE IF NOT EXISTS reviews
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  }
  `)
    .then(() => {
      db.execute('USE reviews');
    })
    .then(() => {
      db.execute(`
      CREATE TABLE IF NOT EXISTS reviews_by_restaurant (
        id INT PRIMARY KEY,
        restaurant_name TEXT,
        username TEXT,
        background_color TEXT,
        location TEXT,
        vip BOOLEAN,
        review TEXT,
        overall INT,
        food INT,
        service INT,
        ambience INT,
        value INT,
        noise INT,
        would_recommend BOOLEAN,
        date DATE
      );
    `);
    })
    .then(() => {
      const lr = new LineByLineReader('cassandra_data.csv');
      const q = 'INSERT INTO reviews_by_restaurant (id,restaurant_name,username,background_color,location,vip,review,overall,food,service,ambience,value,noise,would_recommend,date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

      let linesDone = 0;
      let queries = 0;
      lr.on('line', (line) => {
        linesDone += 1;
        const arr = line.split('|');
        if (linesDone % 100000 === 0) {
          console.log("CUR:",arr[0]);
          console.log(linesDone);
        }
        if (queries >= 2048) {
          lr.pause();
        } else {
          queries += 1;
          db.execute(q, arr, { prepare: true })
            .then((res) => {
              queries -= 1;
              lr.resume();
            });
        }
      });
      lr.on('end', () => {
        console.log(Date.now() - start, 'ms');
      });
    });
};

run();
