"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            error: validation.error.details.map((detail) => detail.message),
        });
    }
    next();
};
exports.validateRequest = validateRequest;
