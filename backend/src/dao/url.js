import Url from '../models/url.model.js';

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
	try {
		const newUrl = new Url({
			full_url: longUrl,
			short_url: shortUrl,
		});

		if (userId) newUrl.user = userId;

		await newUrl.save();
		return newUrl;
	} catch (error) {
		if (err.code == 11000) {
			throw new ConflictError('Short URL already exists');
		}
		throw new Error(err);
	}
};

export const getCustomShortUrl = async (slug) => {
	return await Url.findOne({ short_url: slug });
};
