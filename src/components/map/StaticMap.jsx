import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './StaticMap.module.css';

/*

*/
export const StaticMap = ({ user }) => {
  const customIcon = new Icon({
    iconUrl: require('./icon.png'),
    iconSize: [10, 10],
  });
  return (
    <div className={styles.container}>
      <MapContainer
        center={[52.230496539240356, 20.57358750525853]}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.container}
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
