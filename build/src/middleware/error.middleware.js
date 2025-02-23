import { ApiError } from '../exeptions/api.error.js';
export default function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: 'Непредвиденная ошибка', errors: err.message });
}
//# sourceMappingURL=error.middleware.js.map