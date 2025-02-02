const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const user = await connection('users')
            .where('id', id)
            .select('*')
            .first();

        if(!user) {
            return response.status(400).json({ error: 'Não há nenhum Usuário cadastrado com esse ID.' });
        }

        return response.json(user);
    }
}