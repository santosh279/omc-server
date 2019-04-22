const crypto = require('crypto');
const config = require('config');

const key = crypto.scryptSync(config.get('crypt.KEY'), 'salt', 24); // Generate key
const iv = Buffer.alloc(16, 0); // Initialization vector.
const algorithm = config.get('crypt.ALGO');


exports.encData = async (data, callback) => {
	try {
		let cipher = await crypto.createCipheriv(algorithm, key, iv);
		let encrypted = await cipher.update(data, 'utf8', 'hex');
		encrypted += await cipher.final('hex');
		callback(null, encrypted);
	} catch (e) {
		callback(e)
	}
};


exports.decData = async (encrypted, callback) => {
	try {
		const decipher = await crypto.createDecipheriv(algorithm, key, iv);
		let decrypted = await decipher.update(encrypted, 'hex', 'utf8');
		decrypted += await decipher.final('utf8');
		callback(null, decrypted);
	} catch (e) {
		callback(e)
	}
};
