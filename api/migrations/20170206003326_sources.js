'use strict';

exports.up = function (knex) {
    return knex.schema.createTable('sources', (table) => {
        table.string('id').primary();
        table.string('name');
        table.text('description');
        table.enum('type', ['filesystem']);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('sources');
};
