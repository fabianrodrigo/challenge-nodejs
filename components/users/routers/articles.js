var express = require('express');
var router = express.Router();
var errors = require('../errors');

// Endpoint to list the article
router.get('/', function(req, res) {   
    res.status(501).json(errors.unknown_error);
});


// Endpoint to create an article
router.post('/', function(req, res) {   
    res.status(501).json(errors.unknown_error);
});

// Endpoint to update an article
router.put('/:id', function(req, res) {   
    res.status(501).json(errors.unknown_error);
});

// Endpoint to delete an article
router.delete('/:id', function(req, res) {   
    res.status(501).json(errors.unknown_error);
});

module.exports = router;
