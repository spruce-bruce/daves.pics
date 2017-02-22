'use strict';
exports.up = function (knex) {
    return knex.schema.createTable('images', (table) => {
        table.uuid('id').primary();
        table.string('source_id').references('sources.id');
        table.string('source_meta');

        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('images');
};
