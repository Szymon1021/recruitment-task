import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './StaticMap.module.css';
import './components/styles.css';

/*

*/
export const StaticMap = props => {
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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.user === null
          ? null
          : props.user.map(user => {
              <div>
                <Marker position={user.latlng} icon={customIcon} />
              </div>;
            })}
      </MapContainer>
    </div>
  );
};
