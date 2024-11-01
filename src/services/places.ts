import { Place } from '../types';

export async function getNearbyPlaces(
  latitude: number,
  longitude: number,
  religion: 'christian' | 'hindu' | 'islamic'
): Promise<Place[]> {
  const amenityTypes = {
    christian: 'place_of_worship',
    hindu: 'place_of_worship',
    islamic: 'place_of_worship'
  };

  const religionFilters = {
    christian: 'christian',
    hindu: 'hindu',
    islamic: 'muslim'
  };

  try {
    // Overpass API query to find places of worship within 5km radius
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="${amenityTypes[religion]}"]["religion"="${religionFilters[religion]}"](around:5000,${latitude},${longitude});
        way["amenity"="${amenityTypes[religion]}"]["religion"="${religionFilters[religion]}"](around:5000,${latitude},${longitude});
        relation["amenity"="${amenityTypes[religion]}"]["religion"="${religionFilters[religion]}"](around:5000,${latitude},${longitude});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });

    if (!response.ok) {
      throw new Error('Failed to fetch nearby places');
    }

    const data = await response.json();
    const places = data.elements
      .filter((element: any) => element.type === 'node' && element.tags)
      .map((place: any) => ({
        name: place.tags.name || 'Unnamed Place of Worship',
        address: [
          place.tags['addr:street'],
          place.tags['addr:housenumber'],
          place.tags['addr:city']
        ].filter(Boolean).join(', ') || 'Address unavailable',
        latitude: place.lat,
        longitude: place.lon,
        distance: calculateDistance(latitude, longitude, place.lat, place.lon)
      }));

    // Sort by distance and limit to 10 closest places
    return places
      .sort((a: Place, b: Place) => a.distance - b.distance)
      .slice(0, 10);
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}