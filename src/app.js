require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const databaseService = require('./databaseService')
const knex = require('knex')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

const corsOptions = {
    origin: 'https://noteful-beryl-theta.vercel.app'
}

app.get('/',(req,res) => {
    res.send("Noteful Database Endpoint Homepage")
})

app.get('/notes', cors(corsOptions), (req,res, next) => {
    const knexInstance = req.app.get('db')
    databaseService.getAllNotes(knexInstance)
        .then(notes => res.json(notes))
        .catch(next)
})

app.get('/notes/:noteId', (req,res, next) => {
    const knexInstance = req.app.get('db')
    const {noteId} = req.params

    databaseService.getNoteById(knexInstance, noteId)
        .then(note => res.json(note))
        .catch(next)
})

app.get('/folders', (req,res,next) => {
    const knexInstance = req.app.get('db')

    databaseService.getAllFolders(knexInstance)
        .then(folders => res.json(folders))
        .catch(next)
})

app.get('/folders/:folderId', (req,res,next) => {
    const knexInstance = req.app.get('db')
    const {folderId} = req.params

    databaseService.getFolderById(knexInstance, folderId)
        .then(folder => res.json(folder))
        .catch(next)

})

app.post('/folders', (req,res,next) => {
    const knexInstance = req.app.get('db')
    const {folderid, name} = req.body
    const newFolder = {folderid,name}

    databaseService.insertFolder(knexInstance,newFolder)
        .then(newFolder => {
            res.status(201).json(newFolder)
            console.log(json(newFolder))
        })
        .catch(next)
})

app.post('/notes', (req, res, next) => {
    const knexInstance = req.app.get('db')
    const {id,name,modified,folderid,content} = req.body
    const newNote = {id,name,modified,folderid,content}

    databaseService.insertNote(knexInstance, newNote)
        .then(newNote => {
            res.status(201).json(newNote)
        })
        .catch(next)
})

app.delete('/notes/:noteId', (req,res,next) => {
    const knexInstance = req.app.get('db')
    const {noteId} = req.params

    databaseService.deleteNote(knexInstance,noteId)
        .then(note => res.json(note))
        .catch(next)
})

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV ==='production'){
        response = {error: {message: error.message}}
    }
    else{
        console.error(error)
        response = {message: error.message,error}
    }
    res.status(500).json(response)
})




module.exports = app
