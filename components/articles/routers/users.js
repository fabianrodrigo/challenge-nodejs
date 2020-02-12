var express = require('express');
var router = express.Router();
var errors = require('../errors');

// Endpoint to create a user
router.post('/', function(req, res) {   
    res.json(errors.unknown_error);
});

module.exports = router;
