import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './StaticMap.css';
import { useParams } from 'react-router-dom';

/*

*/
export const StaticMap = () => {
  const { user } = useParams();
  const customIcon = new Icon({
    iconUrl: require('./icon.png'),
    iconSize: [10, 10],
  });
  return (
    <div id="map">
      <MapContainer
        center={[52.230496539240356, 20.57358750525853]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {user === null
          ? null
          : user.map(({ latlng, name, lastname, city, id }) => {
              return (
                <Marker key={id} position={latlng} icon={customIcon}>
                  <Popup>
                    {name}: {lastname} <br /> {city}
                  </Popup>
                </Marker>
              );
            })}
      </MapContainer>
    </div>
  );
};
