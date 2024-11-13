import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import loat from '../images/BEE-logo.png'
import L from 'leaflet';
import './ContactMain.css'

const center = [49.9683, 15.7092];

const customIcon = new L.Icon({
   iconUrl: loat,
   iconSize: [45, 40], 
   iconAnchor: [19, 38], 
   popupAnchor: [0, -38] 
 });

const MapContact = () => {


  return (
      <MapContainer center={center} zoom={18} className="map-container-cont">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
        <Marker position={center} icon={customIcon}>
          <Popup>
            Rozhovice 90 <br /> 538 03 Rozhovice
          </Popup>
        </Marker>
      </MapContainer>
  )
}

export default MapContact
