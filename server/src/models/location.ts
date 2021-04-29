import axios, { AxiosResponse } from "axios";

interface SuccessGeometry {
    features: {
        place_name: string;
        geometry: {
            coordinates: [number, number];
        };
    }[];
}

export class Location {
    address: string;
    error: boolean;
    location!: {
        lat: number | null;
        long: number | null;
    };
    constructor(address: string) {
        this.location = {
            lat: null,
            long: null,
        };
        this.address = address;
        this.error = false;
        (async () => this.getGeometry())();
    }

    getLocation() {
        return {
            location: this.location as { lat: number; long: number },
            address: this.address,
        };
    }

    async getGeometry() {
        let queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
            this.address
        )}.json?access_token=${process.env.MAPBOX_TOKEN}`;

        let response: AxiosResponse<SuccessGeometry> = await axios.get(
            queryUrl
        );
        if (response.data.features.length == 0) {
            this.error = true;
        } else {
            this.address = response.data.features[0].place_name;
            this.location.lat =
                response.data.features[0].geometry.coordinates[0];
            this.location.long =
                response.data.features[0].geometry.coordinates[1];
        }
    }
}
