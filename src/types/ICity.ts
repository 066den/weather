export interface ICity {
	id: number;
	name: string;
	lat: number;
	lon: number;
	country: string;
	state?: string;
}

export interface ICoords {
	lat: number;
	lon: number;
}
