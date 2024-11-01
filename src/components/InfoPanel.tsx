import React from 'react';
import { MapPin, Calendar, Phone, Mail } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { faithThemes } from '../config/config';
import { LocationMap } from './LocationMap';

interface Event {
  title: string;
  date: string;
  time: string;
}

interface InfoPanelProps {
  religion: 'christian' | 'hindu' | 'islamic';
  schedule: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  events: Event[];
  contact: {
    phone: string;
    email: string;
  };
}

export function InfoPanel({
  religion,
  schedule,
  location,
  events,
  contact,
}: InfoPanelProps) {
  const theme = faithThemes[religion];

  return (
    <Tabs.Root defaultValue="schedule" className="p-6">
      <Tabs.List className="flex space-x-4 border-b border-gray-700 mb-6">
        {['Schedule', 'Location', 'Events', 'Contact'].map((tab) => (
          <Tabs.Trigger
            key={tab}
            value={tab.toLowerCase()}
            className={`pb-2 px-2 text-gray-400 hover:text-white border-b-2 border-transparent transition-colors
              data-[state=active]:border-${theme.accent} data-[state=active]:text-white`}
          >
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="min-h-[300px]">
        <Tabs.Content value="schedule" className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Service Schedule</h3>
          <ul className="space-y-4">
            {schedule.map((time, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-300">
                <Calendar size={18} className={theme.text} />
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </Tabs.Content>

        <Tabs.Content value="location" className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Places of Worship</h3>
          <div className="flex items-start gap-3 text-gray-300 mb-4">
            <MapPin size={18} className={theme.text} />
            <span>{location.address}</span>
          </div>
          <LocationMap religion={religion} />
        </Tabs.Content>

        <Tabs.Content value="events" className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <h4 className="font-medium text-white">{event.title}</h4>
                <p className="text-sm text-gray-400 mt-2">
                  {event.date} at {event.time}
                </p>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="contact" className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Phone size={18} className={theme.text} />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail size={18} className={theme.text} />
              <span>{contact.email}</span>
            </div>
          </div>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}