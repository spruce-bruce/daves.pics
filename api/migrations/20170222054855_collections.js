'use strict';
exports.up = (knex, Promise) => {
    return knex.schema.createTable('collections', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('source_id').references('sources.id');
        table.integer('parent_collection').references('collections.id');
        table.timestamps();
    })
        .then(() => knex.schema.table('images', table => {
            table.integer('collection_id').references('collections.id');
        }));
};

exports.down = (knex, Promise) => {
    return knex.schema.table('images', table => {
        table.dropColumn('collection_id');
    })
        .then(() => knex.schema.dropTable('collections'));
};
