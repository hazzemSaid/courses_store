class Error_handler  {
	createError(message) {
		const error = new Error(message);
		return error;
	}
}

module.exports = new Error_handler();