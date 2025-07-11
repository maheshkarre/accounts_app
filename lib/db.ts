import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: '127.0.0.1',       // or your DB host
  user: 'karres',
  password: 'karres123',
  database: 'college_dashboard'
});

