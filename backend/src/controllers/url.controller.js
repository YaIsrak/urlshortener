import Url from '../models/url.model.js';
import {
	createShortUrlService,
	createShortUrlServiceWithUser,
} from '../services/url.service.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

export const createShortUrl = wrapAsync(async (req, res) => {
	const { url, slug } = req.body;
	let newUrl;

	if (req.user) {
		newUrl = await createShortUrlServiceWithUser(url, req.user._id, slug);
	} else {
		newUrl = await createShortUrlService(url);
	}

	res.status(200).json({
		newUrl,
		short_url: `${process.env.APP_URL}/${newUrl.short_url}`,
	});
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
	const { id } = req.params;

	const url = await Url.findOneAndUpdate(
		{ short_url: id },
		{ $inc: { clicks: 1 } },
	);

	if (!url) res.status(404).json({ message: 'URL not found' });

	// res.json(url);
	res.redirect(url.full_url);
});

export const getUrls = wrapAsync(async (req, res) => {
	const urls = await Url.find({ user: req.user._id }).select('-password');

	res.status(200).json(urls);
});

export const deleteUrlById = wrapAsync(async (req, res) => {
	const { id } = req.params;

	await Url.findByIdAndDelete(id);

	res.status(200).json({ message: 'URL deleted' });
});
