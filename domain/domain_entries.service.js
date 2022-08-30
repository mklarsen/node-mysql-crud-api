const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    getByDomain,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.DomainEntries.findAll();
}

async function getById(id) {
    return await getEntries(id);
}

async function getByDomain(domain) {
    return await getDomainEntries(domain);
}

async function create(params) {
    const entries = new db.DomainEntries(params);

    // save entries
    await entries.save();
}

async function update(id, params) {
    const entries = await getEntries(id);

    // copy params to domain and save
    Object.assign(entries, params);
    await entries.save();
}

async function _delete(id) {
    const entries = await getEntries(id);
    await entries.destroy();
}


// helper functions
async function getEntries(id) {
    const entries = await db.DomainEntries.findByPk(id);
    if (!entries) throw 'Entries not found';
    return entries;
}

async function getDomainEntries(domain) {
    const entries = await db.DomainEntries.findAll(
                                    { where: { domain: domain } }
    );
    if (!entries) throw 'Entries not found';
    return entries;
}
