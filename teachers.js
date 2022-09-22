const { Pool } = require('pg');

const pool = new Pool({
  user: 'spencerbethel',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];

const queryString = `
SELECT DISTINCT teachers.name as name, cohorts.name as cohort
FROM assistance_requests 
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`;

const values = [`${cohortName}`];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach((teacher) => {
    console.log(`${teacher.cohort}: ${teacher.name}`);
  })
})
.catch(err => console.error('query error', err.stack));