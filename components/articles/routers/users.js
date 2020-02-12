var express = require('express');
var router = express.Router();
var errors = require('../errors');

// Endpoint to create a user
router.post('/:id', function(req, res) {   
    res.status(501).json(errors.unknown_error);
});

module.exports = router;
