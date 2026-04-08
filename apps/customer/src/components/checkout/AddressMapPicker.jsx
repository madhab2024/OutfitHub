import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Search, Loader2, MapPin, Check, Navigation } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition, setAddress, setLoading }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      reverseGeocode(lat, lng);
    },
  });

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'OutfitHub-App'
          }
        }
      );
      const data = await response.json();
      setAddress(data.display_name || 'Address not found');
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      setAddress('Error fetching address');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position} icon={DefaultIcon} />
  );
};

export const AddressMapPicker = ({ isOpen, onClose, onConfirm, initialAddress }) => {
  const [position, setPosition] = useState([12.9716, 77.5946]); // Default to Bangalore
  const [address, setAddress] = useState(initialAddress || '');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialAddress) {
      handleSearch(initialAddress);
    }
  }, []);

  const handleSearch = async (query) => {
    if (!query) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
        {
          headers: {
            'User-Agent': 'OutfitHub-App'
          }
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPos);
        setAddress(display_name);
      } else {
        alert('No results found for this location');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          // Trigger reverse geocode manually or handled by LocationMarker click logic? 
          // Better to do it here for explicit flow
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
                setAddress(data.display_name || 'Address not found');
                setLoading(false);
            })
            .catch(() => setLoading(false));
        },
        () => {
          alert('Unable to retrieve your location');
          setLoading(false);
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[80vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Select Delivery Location</h2>
            <p className="text-sm text-slate-500">Pin your exact location on the map</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for your locality, street or building..."
              className="w-full pl-12 pr-24 py-4 rounded-2xl border-2 border-transparent bg-white shadow-sm focus:border-[#0066FF] focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />
            <button 
              onClick={() => handleSearch(searchQuery)}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="animate-spin" size={18} /> : 'Search'}
            </button>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative flex-1 bg-slate-100 min-h-0">
          <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker 
              position={position} 
              setPosition={setPosition} 
              setAddress={setAddress} 
              setLoading={setLoading} 
            />
          </MapContainer>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
            <button 
              onClick={getUserLocation}
              className="p-3 bg-white rounded-xl shadow-lg text-slate-700 hover:text-[#0066FF] transition-colors"
              title="Use my current location"
            >
              <Navigation size={22} />
            </button>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-[401] bg-white/20 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <Loader2 className="animate-spin text-[#0066FF]" size={24} />
                <span className="font-bold text-slate-900">Fetching address...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer/Selected Address */}
        <div className="p-8 border-t border-slate-100 bg-white">
          <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-[#0066FF]">
                <MapPin size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Selected Delivery Area</span>
              </div>
              <p className="text-slate-900 font-bold leading-snug">
                {loading ? 'Detecting address...' : address || 'Click on the map to set location'}
              </p>
            </div>
            <button 
              onClick={() => onConfirm(address, position)}
              disabled={!address || loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-[#0066FF] text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-[#0052CC] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              <Check size={20} />
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
