import { useState, useEffect, useCallback } from "react";

type TravelMode = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

interface Coordinates {
  lat: number;
  lng: number;
}

interface DistanceResult {
  distance: string | null;
  duration: string | null;
  loading: boolean;
  error: string | null;
}

const useDistance = (
  origin: Coordinates,
  destination: Coordinates,
  travelMode: TravelMode = "DRIVING"
): DistanceResult => {
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDistance = useCallback(() => {
    if (typeof window === "undefined" || !window.google?.maps) {
      console.error("Google Maps API is not loaded.");
      setError("Google Maps API not available.");
      setLoading(false);
      return;
    }
    console.log('hitting1');

    console.log("Google Maps API loaded, fetching distance...");

    const service = new google.maps.DistanceMatrixService();
    console.log('hitting2');
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode[travelMode.toUpperCase() as keyof typeof google.maps.TravelMode],
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        setLoading(false);

        console.log("API Response:", response, "Status:", status);

        if (status === "OK") {
          const result = response!.rows[0]?.elements[0];
          if (result?.status === "OK") {
            setDistance(result.distance.text);
            setDuration(result.duration.text);
          } else {
            console.error("Invalid result:", result);
            setError("No valid route found.");
          }
        } else {
          console.error("Error fetching distance:", status);
          setError(`Error: ${status}`);
        }
      }
    );
  }, [origin, destination, travelMode]);

  useEffect(() => {
    fetchDistance();
  }, [fetchDistance]);

  return { distance, duration, loading, error };
};

export default useDistance;
