'use strict';

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('sources').del()

        .then(() => {

            return Promise.all([
                // Inserts seed entries
                knex('sources').insert({ id: 'wd-cloud', name: 'WD Cloud', type: 'filesystem', description: 'description text goes here' })
            ]);
        });
};
