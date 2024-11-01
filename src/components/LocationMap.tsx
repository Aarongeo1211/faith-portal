import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Loader2 } from 'lucide-react';
import L from 'leaflet';
import { getNearbyPlaces } from '../services/places';
import type { Place } from '../types';

interface LocationMapProps {
  religion: 'christian' | 'hindu' | 'islamic';
}

// Default coordinates for different regions
const defaultCoordinates = {
  christian: { lat: 40.7128, lng: -74.0060 }, // New York
  hindu: { lat: 28.6139, lng: 77.2090 },      // Delhi
  islamic: { lat: 21.4225, lng: 39.8262 }     // Mecca
};

export function LocationMap({ religion }: LocationMapProps) {
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const coordinates = defaultCoordinates[religion];

  useEffect(() => {
    async function fetchPlaces() {
      setLoadingPlaces(true);
      try {
        const places = await getNearbyPlaces(coordinates.lat, coordinates.lng, religion);
        setNearbyPlaces(places);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoadingPlaces(false);
      }
    }

    fetchPlaces();
  }, [religion, coordinates.lat, coordinates.lng]);

  if (loadingPlaces) {
    return (
      <div className="h-[400px] rounded-lg bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          maxZoom={19}
        />

        {/* Center marker */}
        <Marker 
          position={[coordinates.lat, coordinates.lng]}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `<div class="w-6 h-6 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center text-white text-xs">📍</div>`,
          })}
        >
          <Popup>
            <div className="text-gray-900">
              <h4 className="font-semibold">Center Location</h4>
              <p className="text-sm">Explore places of worship in this area</p>
            </div>
          </Popup>
        </Marker>

        {/* Nearby places markers */}
        {nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div class="w-6 h-6 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center text-white text-xs">${index + 1}</div>`,
            })}
          >
            <Popup>
              <div className="text-gray-900">
                <h4 className="font-semibold">{place.name}</h4>
                <p className="text-sm">{place.address}</p>
                <p className="text-sm text-gray-600 mt-1">{place.distance.toFixed(1)} km away</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}