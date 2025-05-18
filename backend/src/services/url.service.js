import { saveShortUrl } from '../dao/url.js';
import Url from '../models/url.model.js';
import { generateNanoId } from '../utils/helper.js';

export const createShortUrlService = async (url) => {
	const shortUrl = generateNanoId(6);
	if (!shortUrl) throw new Error('Failed to generate short url');

	return await saveShortUrl(shortUrl, url);
};

export const createShortUrlServiceWithUser = async (
	url,
	userId,
	slug = null,
) => {
	const shortUrl = slug || generateNanoId(6);

	const exists = await Url.findOne({ short_url: slug });
	if (exists) throw new Error('This custom url already exists');

	return await saveShortUrl(shortUrl, url, userId);
};
