const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Domain.findAll();
}

async function getById(id) {
    return await getDomain(id);
}

async function create(params) {
    // validate
    if (await db.Domain.findOne({ where: { domain: params.domain } })) {
        throw 'Domain "' + params.domain + '" is already registered';
    }

    const domain = new db.Domain(params);

    // save domain
    await domain.save();
}

async function update(id, params) {
    const domain = await getDomain(id);

    // validate
    const domainChanged = params.domain && domain.domain !== params.domain;
    if (domainChanged && await db.Domain.findOne({ where: { domain: params.domain } })) {
        throw 'Domain "' + params.domain + '" is already registered';
    }

    // copy params to domain and save
    Object.assign(domain, params);
    await domain.save();
}

async function _delete(id) {
    const domain = await getDomain(id);
    await domain.destroy();
}


// helper functions
async function getDomain(id) {
    const domain = await db.Domain.findByPk(id);
    if (!domain) throw 'Domain not found';
    return domain;
}
