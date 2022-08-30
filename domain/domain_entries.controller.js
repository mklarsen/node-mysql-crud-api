const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

const domainEntriesService = require('./domain_entries.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);

router.get('/domain/:domain', getByDomain);

router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions
function getAll(req, res, next) {
    domainEntriesService.getAll()
        .then(domain => res.json(domain))
        .catch(next);
}

function getById(req, res, next) {
    domainEntriesService.getById(req.params.id)
        .then(domain => res.json(domain))
        .catch(next);
}

function getByDomain(req, res, next) {
    domainEntriesService.getByDomain(req.params.domain)
        .then(domain => res.json(domain))
        .catch(next);
}

function create(req, res, next) {
    domainEntriesService.create(req.body)
        .then(() => res.json({ message: 'Entries created' }))
        .catch(next);
}

function update(req, res, next) {
    domainEntriesService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Entries updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    domainEntriesService.delete(req.params.id)
        .then(() => res.json({ message: 'Entries deleted' }))
        .catch(next);
}

// schema functions
function createSchema(req, res, next) {
    const schema = Joi.object({
        domain: Joi.string().min(6).required(),
        name: Joi.string(),
        ttl: Joi.string(),
        type: Joi.string(),
        record: Joi.string(),
      });
      validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        domain: Joi.string().min(6).required(),
        name: Joi.string(),
        ttl: Joi.string(),
        type: Joi.string(),
        record: Joi.string(),
      });
      validateRequest(req, next, schema);
}
