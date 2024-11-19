import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import loat from '../images/BEE-logo.png'
import L from 'leaflet';

// Komponenta mapky, která je na hlavní stránce. Zde se mění lokace mapky kam ukazuje.

const center = [49.9683, 15.7092];

const customIcon = new L.Icon({
   iconUrl: loat,
   iconSize: [45, 40], // velikost ikony
   iconAnchor: [19, 38], // ukotvení ikony
   popupAnchor: [0, -38] // ukotvení popupu
 });

const Map = () => {


  return (
    <div className='background-linear-deff mappp'>
      <h2 className='main-topic-small bl'>Kde nás najdete?</h2>
      <div className="adress-main">
         <p>Náš fotbalový klub se nachází v obci Rozhovice v Pardubickém kraji.</p>
         <div className="adress-smaller-text">
            <p>Rozhovice 90 </p>
            <p>538 03 Rozhovice</p>
         </div>
      </div>
      <MapContainer center={center} zoom={16} className="map-container">
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
    </div>
  )
}

export default Map
