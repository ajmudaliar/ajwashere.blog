export interface Location {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  type: 'lived' | 'traveled'
  years?: string
  current?: boolean
}

export interface TraveledLocation extends Location {
  fromId: string // ID of the origin city
}

export interface Arc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
}

// Places lived - chronological order
export const LIVED_LOCATIONS: Location[] = [
  { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', lat: 23.02, lng: 72.57, type: 'lived' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', lat: 19.08, lng: 72.88, type: 'lived' },
  { id: 'bangalore', name: 'Bangalore', country: 'India', lat: 12.97, lng: 77.59, type: 'lived' },
  { id: 'delhi', name: 'Delhi', country: 'India', lat: 28.61, lng: 77.21, type: 'lived' },
  { id: 'chennai', name: 'Chennai', country: 'India', lat: 13.08, lng: 80.27, type: 'lived' },
  { id: 'pune', name: 'Pune', country: 'India', lat: 18.52, lng: 73.86, type: 'lived' },
  { id: 'manchester', name: 'Manchester', country: 'UK', lat: 53.48, lng: -2.24, type: 'lived' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', lat: 49.28, lng: -123.12, type: 'lived' },
  { id: 'montreal', name: 'Montreal', country: 'Canada', lat: 45.50, lng: -73.57, type: 'lived', current: true },
]

// Current home location
export const HOME_LOCATION = LIVED_LOCATIONS.find(l => l.current)!

// Helper to get location by ID
const getLived = (id: string) => LIVED_LOCATIONS.find(l => l.id === id)!

// Places traveled - each with its origin city
export const TRAVELED_LOCATIONS: TraveledLocation[] = [
  // From Montreal
  { id: 'singapore-mtl', name: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, type: 'traveled', fromId: 'montreal' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, type: 'traveled', fromId: 'montreal' },
  { id: 'new-york', name: 'New York', country: 'USA', lat: 40.71, lng: -74.01, type: 'traveled', fromId: 'montreal' },

  // From Delhi
  { id: 'singapore-del', name: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, type: 'traveled', fromId: 'delhi' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.14, lng: 101.69, type: 'traveled', fromId: 'delhi' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', lat: 13.76, lng: 100.50, type: 'traveled', fromId: 'delhi' },

  // From Chennai
  { id: 'dubai', name: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27, type: 'traveled', fromId: 'chennai' },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', lat: -1.29, lng: 36.82, type: 'traveled', fromId: 'chennai' },

  // From Manchester
  { id: 'london', name: 'London', country: 'UK', lat: 51.51, lng: -0.13, type: 'traveled', fromId: 'manchester' },
]

// Generate arcs from each trip's origin to destination
export const TRAVEL_ARCS: Arc[] = TRAVELED_LOCATIONS.map(dest => {
  const origin = getLived(dest.fromId)
  return {
    startLat: origin.lat,
    startLng: origin.lng,
    endLat: dest.lat,
    endLng: dest.lng,
  }
})

// Unique traveled locations (for points display - no duplicates)
export const UNIQUE_TRAVELED_LOCATIONS: Location[] = [
  { id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, type: 'traveled' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.14, lng: 101.69, type: 'traveled' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', lat: 13.76, lng: 100.50, type: 'traveled' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, type: 'traveled' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27, type: 'traveled' },
  { id: 'london', name: 'London', country: 'UK', lat: 51.51, lng: -0.13, type: 'traveled' },
  { id: 'new-york', name: 'New York', country: 'USA', lat: 40.71, lng: -74.01, type: 'traveled' },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', lat: -1.29, lng: 36.82, type: 'traveled' },
]

export const ALL_LOCATIONS = [...LIVED_LOCATIONS, ...UNIQUE_TRAVELED_LOCATIONS]
