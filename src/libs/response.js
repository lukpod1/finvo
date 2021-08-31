export const Responses = {
    buildResponse(statusCode = 500, data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode,
            body: JSON.stringify(data),
        };
    },

    OK(data = {}) {
        return this.buildResponse(200, data);
    },

    NoContent(data = {}) {
        return this.buildResponse(204, data);
    },

    BadRequest(data = {}) {
        return this.buildResponse(400, data);
    },

    NotFound(data = {}) {
        return this.buildResponse(404, data);
    },

    InternalServerError(data = {}) {
        return this.buildResponse(500, data);
    }

};