import React from 'react';
import { FaithPage } from './FaithPage';

const christianData = {
  religion: 'christian' as const,
  title: 'Christian Community Center',
  backgroundImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80',
  description: "A place of worship, community, and spiritual growth where all are welcome to experience God's love and grace. Join us in our journey of faith, fellowship, and service.",
  images: [
    'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1601142634808-38923eb7c560?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80'
  ],
  schedule: [
    'Sunday Morning Service: 9:00 AM',
    'Sunday Evening Service: 6:00 PM',
    'Wednesday Bible Study: 7:00 PM',
    'Youth Group: Friday 6:30 PM',
    'Morning Prayer: Daily 6:00 AM',
    'Sunday School: 10:30 AM',
    'Choir Practice: Thursday 7:00 PM'
  ],
  location: {
    address: '123 Faith Street, Cityville, ST 12345',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  events: [
    {
      title: 'Easter Sunday Service',
      date: 'March 31, 2024',
      time: '9:00 AM'
    },
    {
      title: 'Good Friday Service',
      date: 'March 29, 2024',
      time: '7:00 PM'
    },
    {
      title: 'Community Outreach',
      date: 'March 15, 2024',
      time: '9:00 AM'
    },
    {
      title: 'Youth Revival Night',
      date: 'March 22, 2024',
      time: '6:30 PM'
    }
  ],
  contact: {
    phone: '(555) 123-4567',
    email: 'info@christiancenter.org'
  },
  ministries: [
    'Childrens Ministry',
    'Youth Ministry',
    'Adult Bible Study',
    'Music Ministry',
    'Outreach & Missions',
    'Prayer Warriors',
    'Marriage Ministry'
  ],
  smallGroups: [
    'Young Adults (18-25)',
    'Couples Fellowship',
    'Womens Bible Study',
    'Mens Fellowship',
    'Senior Saints'
  ]
};

export default function ChristianPage() {
  return <FaithPage {...christianData} />;
}