'use strict';
exports.up = (knex, Promise) => {
    return knex.schema.createTable('collections', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('source_id').references('sources.id');
        table.integer('parent_collection').references('collections.id');
    })
        .then(() => knex.schema.createTable('image_collection', (table) => {
            table.uuid('image_id').references('images.id');
            table.integer('collection_id').references('collections.id');
            table.primary(['image_id', 'collection_id']);
        }));
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('image_collection')
        .then(() => knex.schema.dropTable('collections'));
};
