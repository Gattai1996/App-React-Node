const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('games')
            .count(); 

        const games = await connection('games')
            .join('users', 'users.id', '=', 'games.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'games.*',
                'users.name',
                'users.email',
                'users.whatsapp',
                'users.city',
                'users.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(games);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('games').insert({
            title,
            description,
            value,
            user_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.header.authorization;

        const game = await connection('games')
            .where('id', id)
            .select('user_id')
            .first();

        if (game.user_id !== user_id) {
            return response.status(401).json({ error: 'Operação não autorizada.' });
        }

        await connection('games').where('id', id).delete();

        return response.status(204).send();
    }
}