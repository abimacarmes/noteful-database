const databaseService = {
    getAllNotes(knex){
        'Returns all notes in the database'
        return knex 
            .from('notes')
            .select('*');
    },
    getNoteById(knex,id){
        return knex
            .from('notes')
            .select('*')
            .where('id', id);
    },
    getAllFolders(knex){
        return knex
            .from('folders')
            .select('*')
    },
    getFolderById(knex,id){
        return knex
            .from('notes')
            .select('*')
            .where('folderid',id)
    },
    deleteNote(knex,id){
        return knex('notes')
            .where('id',id)
            .delete();
    },
    insertNote(knex, newNote){
        return knex
            .insert(newNote)
            .into('notes')
    },
    insertFolder(knex, newFolder){
        return knex
            .insert(newFolder)
            .into('folders')
    }
}

module.exports = databaseService