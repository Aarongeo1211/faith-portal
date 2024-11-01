export interface Location {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Event {
  title: string;
  date: string;
  time: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export type Religion = 'christian' | 'hindu' | 'islamic';

export interface FaithData {
  religion: Religion;
  title: string;
  backgroundImage: string;
  description: string;
  images: string[];
  schedule: string[];
  location: Location;
  events: Event[];
  contact: Contact;
  ministries?: string[];
  smallGroups?: string[];
  classes?: string[];
  services?: string[];
  programs?: string[];
}

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}