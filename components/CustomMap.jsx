import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
	iconUrl: "/icons/marker.webp",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	iconSize: [30, 40],
	iconAnchor: [15, 40],
	popupAnchor: [0, -35],
	shadowSize: [41, 41],
});

const position = [49.245430, -123.059146];

const CustomMap = () => {
	return (
		<MapContainer
			center={position}
			zoom={15}
			style={{ height: "100%", width: "100%", borderRadius: "12px" }}
		>
			{/* Светлая карта с чуть более контрастными элементами */}
			<TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

			{/* Маркер */}
			<Marker position={position} icon={DefaultIcon}>
				<Popup>
					2262 E 28th Ave<br />
					Backyard area
				</Popup>
			</Marker>

			{/* Голубоватая подсветка вокруг маркера */}
			<Circle
				center={position}
				radius={150}
				pathOptions={{ color: "#2a85ff", fillColor: "#2a85ff", fillOpacity: 0.15 }}
			/>
		</MapContainer>
	);
};

export default CustomMap;
