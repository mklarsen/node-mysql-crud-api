const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

const domainService = require('./domain.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions
function getAll(req, res, next) {
    domainService.getAll()
        .then(domain => res.json(domain))
        .catch(next);
}

function getById(req, res, next) {
    domainService.getById(req.params.id)
        .then(domain => res.json(domain))
        .catch(next);
}

function create(req, res, next) {
    domainService.create(req.body)
        .then(() => res.json({ message: 'Domain created' }))
        .catch(next);
}

function update(req, res, next) {
    domainService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Domain updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    domainService.delete(req.params.id)
        .then(() => res.json({ message: 'Domain deleted' }))
        .catch(next);
}

// schema functions
function createSchema(req, res, next) {
    const schema = Joi.object({
        domain: Joi.string().min(6).required(),
        domhand: Joi.string().min(4).required(),
      });
      validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        domain: Joi.string().min(6).required(),
        domhand: Joi.string().min(4).required(),
      });
      validateRequest(req, next, schema);
}
