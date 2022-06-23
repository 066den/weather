interface IDate {
	time: string;
	date: string;
}

export const useDate = (): IDate => {
	const locale = 'en';
	const today = new Date();

	// const day = today.toLocaleDateString(locale, { weekday: 'long' });
	const date = `${today.getDate()} ${today.toLocaleDateString(locale, {
		month: 'long',
	})}\n\n`;

	const time = today.toLocaleTimeString(locale, {
		hour: 'numeric',
		hour12: true,
		minute: 'numeric',
	});

	return {
		date,
		time,
	};
};
