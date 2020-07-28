import React from 'react';
import { Map as LaefletMap, TileLayer} from 'react-leaflet';
import './Map.css';
import {showDataOnMap} from './util.js'

function Map({countries, casesType, center, zoom}){
    return ( 
        <div className="map">
            <LaefletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
                attribution='&copy; <a href="http://osm/org/copyright">OpenStreetMap</a> contribution '/>
                {showDataOnMap(countries, casesType)}
            </LaefletMap>
        </div>
    )
}
 export default Map;