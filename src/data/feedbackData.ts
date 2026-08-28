export interface Feedback {
  id: string;
  clientName: string;
  rating: number;
  service: string;
  review: string;
  createdAt: string;
  approvedForPublicDisplay: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  profileImage?: string;
  fallbackAvatar?: string;
}

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    clientName: 'Akash',
    rating: 5,
    service: 'Video Editing',
    review: 'Working with Phanendra was a smooth experience. The editing was clean, visually engaging and delivered with attention to detail.',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: true,
    moderationStatus: 'approved',
    fallbackAvatar: '/avatars/avatar-04.jpg',
  },
  {
    id: '2',
    clientName: 'Sarah J.',
    rating: 5,
    service: 'UI/UX Designing',
    review: 'The website redesign completely transformed our online presence. The new UI is intuitive, modern, and exactly what we were looking for. Highly recommended for anyone needing a fresh look!',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: true,
    moderationStatus: 'approved',
    fallbackAvatar: '/avatars/avatar-02.jpg',
  },
  {
    id: '3',
    clientName: 'Michael T.',
    rating: 4,
    service: 'Thumbnail Designing',
    review: 'Great eye for detail and design. The thumbnails provided a noticeable boost to our click-through rates. The communication was excellent throughout the entire process.',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: true,
    moderationStatus: 'approved',
    fallbackAvatar: '/avatars/avatar-01.jpg',
  },
  {
    id: '4',
    clientName: 'Priya Patel',
    rating: 5,
    service: 'Graphic Designing',
    review: 'Absolutely stunning work. The brand assets look premium and fit our vision perfectly. The turnaround time was also impressive without compromising on quality.',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: true,
    moderationStatus: 'approved',
    fallbackAvatar: '/avatars/avatar-05.jpg',
  },
  {
    id: '5',
    clientName: 'Alex Rivera',
    rating: 5,
    service: 'Website Designing',
    review: 'From wireframes to the final build, the process was seamless. The attention to interactive elements and responsive design really sets the work apart.',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: true,
    moderationStatus: 'approved',
    fallbackAvatar: '/avatars/avatar-03.jpg',
  },
  {
    id: '6',
    clientName: 'Anonymous',
    rating: 2,
    service: 'Motion Graphics',
    review: 'The animations were okay but missed the core feel we were looking for.',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: false,
    moderationStatus: 'pending',
    fallbackAvatar: '/avatars/avatar-06.jpg',
  },
  {
    id: '7',
    clientName: 'David W.',
    rating: 3,
    service: 'Video Editing',
    review: 'Decent work overall, but some transitions felt a bit rushed.',
    createdAt: new Date().toISOString(),
    approvedForPublicDisplay: false,
    moderationStatus: 'pending',
    fallbackAvatar: '/avatars/avatar-01.jpg',
  }
];
