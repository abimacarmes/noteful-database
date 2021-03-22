require('dotenv').config()
const knex = require('knex')
const databaseService = require('./databaseService')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

console.log(databaseService.getAllNotes())