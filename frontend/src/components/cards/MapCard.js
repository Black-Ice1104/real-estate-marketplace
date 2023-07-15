import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_KEY } from "../../config";

export default function MapCard({ ad }) {
  const defaultProps = {
    center: {
      //   lat: -33.865143,
      //   lng: 151.2099,
      lat: ad?.location?.coordinates[1],
      lng: ad?.location?.coordinates[0],
    },
    zoom: 11,
  };

  if (ad?.location?.coordinates?.length) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ width: "100%", height: "350px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <div
            lat={ad?.location?.coordinates[1]}
            lng={ad?.location?.coordinates[0]}
          >
            <span className="lead">📍</span>
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}