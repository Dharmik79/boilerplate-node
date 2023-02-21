const joi = require('joi');

exports.validateParamsWithJoi = (body, schemaKeys) => {
    const schema = joi.object(schemaKeys);

    try {
        const { error, value } = schema.validate(body, {
            abortEarly: false
        });

        if (error && error.details) {
            let data = { error: true, details: error.details };
            return data;
        } else {
            return value;
        }
    } catch (err) {
        let data = { error: true, details: err };
        return data;
    }
}