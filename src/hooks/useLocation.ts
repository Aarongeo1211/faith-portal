import { useState, useEffect } from 'react';
import { LocationState } from '../types';

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      if (location.loading) {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: 'Location detection timed out'
        }));
        controller.abort();
      }
    }, 5000);

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported',
        loading: false,
      }));
      clearTimeout(timeoutId);
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!controller.signal.aborted) {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
              loading: false,
            });
          }
          clearTimeout(timeoutId);
        },
        (error) => {
          if (!controller.signal.aborted) {
            setLocation(prev => ({
              ...prev,
              error: error.message,
              loading: false,
            }));
          }
          clearTimeout(timeoutId);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } catch (error) {
      setLocation(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        loading: false,
      }));
      clearTimeout(timeoutId);
    }

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  return location;
}