const corsHeaders = { 
    'Access-Control-Allow-Origin': '*'   
};

// Success
module.exports.successHandler = (obj, callback) => {
    callback(null, {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(obj)
    });
};

// Internal Server Error
module.exports.errorHandler = (err, callback) => {
    callback(null, {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
            message: 'Internal Server Error',
            error: err.toString()
        })
    });
};

// Not Found
module.exports.notFoundHandler = (callback) => {
    callback(null, {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({
            message: 'Not Found'
        })
    });
};

// OPTIONS
module.exports.optionsHandler = (callback) => {
    callback(null, {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
                "Accept, Authorization, Content-Type, Origin"            
        }
    });
};
