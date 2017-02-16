'use strict';

exports.up = function (knex, Promise) {

    return knex.schema.createTable('image_files', (table) => {

        table.string('key').primary();
        table.uuid('image_id').references('images.id');
        table.string('bucket');
        table.enum('type', ['original', 'thumb']);
        table.string('location');
        table.integer('width');
        table.integer('height');
        table.json('image_data');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {

    return knex.schema.dropTable('image_files');
};
