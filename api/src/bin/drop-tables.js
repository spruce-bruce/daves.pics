#! /usr/bin/env node
const ioc = require('./cli-app');

const knex = ioc.create('knex');

if (process.env.NODE_ENV === 'production') {
  console.log('In production. Not going to drop tables.');
} else {
  knex.schema
    .raw('DROP SCHEMA public CASCADE')
    .raw('CREATE SCHEMA public')
    .then(() => {
      console.log('Dropped tables');
      process.exit(0);
    });
}
