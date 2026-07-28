const Order = require('../models/order');
const { getMutex } = require('../utils/mutex');

async function idempotencyKey(req, res, next) {
	if (req.method !== 'POST') {
		return next();
	}

	const { idempotencyKey } = req.body || {};

	if (!idempotencyKey) {
		return res.status(400).json({ message: 'idempotencyKey is required' });
	}

	const mutex = getMutex(`idempotency:${idempotencyKey}`);
	const release = await mutex.acquire();
	let released = false;

	const releaseLock = () => {
		if (released) {
			return;
		}

		released = true;
		release();
	};

	try {
		const existingOrder = await Order.findOne({ idempotencyKey });

		if (existingOrder) {
			releaseLock();
			return res.status(200).json(existingOrder);
		}

		res.once('finish', releaseLock);
		res.once('close', releaseLock);
		return next();
	} catch (error) {
		releaseLock();
		return res.status(500).json({ message: 'Idempotency check failed', error: error.message });
	}
}

module.exports = idempotencyKey;
