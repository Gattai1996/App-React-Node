
exports.up = function (knex) {
    return knex.schema.createTable('games', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.float('value').notNullable;
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('games');
};
