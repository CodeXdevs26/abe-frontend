"use client";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, MapPinHouse } from "lucide-react";
import Spinner from "@/components/animation/spinner";

interface GoogleMapContainerProps {
  latitude: number;
  setLatitude: (lat: number) => void;
  longitude: number;
  setLongitude: (lng: number) => void;
  address: string;
  setAddress: (address: string) => void;
  className?: string;
}

const GoogleMapContainer: React.FC<GoogleMapContainerProps> = ({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  address,
  setAddress,
  className,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const searchInputRef = useRef<google.maps.places.SearchBox | null>(null);

  console.log('process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: ["places"],
  });

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );

  const changeCoordinates = (coord: google.maps.MapMouseEvent) => {
    if (coord.latLng) {
      setLatitude(coord.latLng.lat());
      setLongitude(coord.latLng.lng());
      setAddressFromCoord(coord.latLng.lat(), coord.latLng.lng());
    }
  };

  useEffect(() => {
    if (map) {
      map.panTo({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, map]);

  const handlePlacesChanged = () => {
    if (searchInputRef.current) {
      const places = searchInputRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setAddress(place.formatted_address || "");
        setLatitude(place.geometry?.location?.lat() || latitude);
        setLongitude(place.geometry?.location?.lng() || longitude);
      }
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setAddressFromCoord(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setLatitude(lat);
      setLongitude(lng);
      setAddressFromCoord(lat, lng);
    }
  };

  const setAddressFromCoord = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error("Geocoder failed due to: ", status);
      }
    });
  };

  return (
    <div className="h-full w-full">
      {!isLoaded ? (
        <Spinner size="80px" className="py-6" />
      ) : (
        <GoogleMap
          mapContainerClassName={cn(
            "w-full h-full border-slate-200 border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out relative",
            className
          )}
          center={center}
          zoom={13}
          onLoad={(map) => setMap(map)}
          onClick={handleMapClick}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (searchInputRef.current = ref)}
            onPlacesChanged={handlePlacesChanged}
          >
            <div className="relative left-48 top-2.5 max-w-[300px]">
              <input
                type="text"
                placeholder="Search your address"
                value={address}
                className="form-control w-full border border-gray-400 bg-white px-3 py-2 pl-8 text-black"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </StandaloneSearchBox>

          <button
            type="button"
            onClick={handleLocateMe}
            className="border-red flex-center absolute right-2 top-1/3 z-50 aspect-square size-10 rounded-none border-none bg-white text-gray-600 shadow"
            title="Locate my location"
          >
            <MapPinHouse size={23} />
          </button>

          <Marker
            position={{ lat: latitude, lng: longitude }}
            draggable
            onDragEnd={changeCoordinates}
            animation={google.maps.Animation.DROP}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapContainer;
