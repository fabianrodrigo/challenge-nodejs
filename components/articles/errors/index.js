//Error list used on this module
module.exports = {
    not_authorized: {
        errorCode: 1,
        error: 'not authorized' 
    },
    malformed_json: {
        errorCode: 2,
        error: 'malformed json'   
    },
    unknown_error: {
        errorCode: 3,
        error: "an unknown error has ocurred"
    },
    invalid_userId: {
        errorCode: 202,
        error: "invalid user id"
    },
    invalid_title: {
        errorCode: 203,
        error: "invalid title"
    },
    invalid_text: {
        errorCode: 204,
        error: "invalid text"
    },
    invalid_article_id: {
        errorCode: 205,
        error: "invalid article id"
    },
    article_not_exists: {
        errorCode: 206,
        error: "article not exists"
    },
}
