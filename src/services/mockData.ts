/**
 * Mock News Data for Development
 */

import { NewsByCategory } from '../types';

export const mockNewsData: NewsByCategory = {
  Technology: [
    {
      title: 'Revolutionary AI Breakthrough Transforms Industry',
      link: 'https://example.com/ai-breakthrough',
      og: 'https://picsum.photos/400/300?random=1',
      description:
        'Scientists announce major advancement in artificial intelligence technology',
      source: 'Tech News',
      publishedAt: '2025-01-12T10:00:00Z',
      category: 'Technology',
    },
    {
      title: 'New Smartphone Features Set to Change Mobile Computing',
      link: 'https://example.com/smartphone-features',
      og: 'https://picsum.photos/400/300?random=2',
      description: 'Latest smartphone release includes groundbreaking features',
      source: 'Mobile Tech',
      publishedAt: '2025-01-12T09:00:00Z',
      category: 'Technology',
    },
    {
      title: 'Quantum Computing Makes Leap Forward',
      link: 'https://example.com/quantum-computing',
      og: 'https://picsum.photos/400/300?random=3',
      description: 'Researchers achieve new milestone in quantum computing',
      source: 'Science Daily',
      publishedAt: '2025-01-12T08:00:00Z',
      category: 'Technology',
    },
    {
      title: 'Electric Vehicles Reach New Efficiency Records',
      link: 'https://example.com/ev-records',
      og: 'https://picsum.photos/400/300?random=4',
      description: 'Latest EV models show impressive range improvements',
      source: 'Auto News',
      publishedAt: '2025-01-12T07:00:00Z',
      category: 'Technology',
    },
  ],
  Business: [
    {
      title: 'Global Markets Respond to Economic Policy Changes',
      link: 'https://example.com/market-response',
      og: 'https://picsum.photos/400/300?random=5',
      description: 'Stock markets show positive reaction to new policies',
      source: 'Financial Times',
      publishedAt: '2025-01-12T11:00:00Z',
      category: 'Business',
    },
    {
      title: 'Tech Giants Announce Record Quarterly Earnings',
      link: 'https://example.com/tech-earnings',
      og: 'https://picsum.photos/400/300?random=6',
      description: 'Major technology companies report strong financial results',
      source: 'Business Weekly',
      publishedAt: '2025-01-12T10:30:00Z',
      category: 'Business',
    },
    {
      title: 'Sustainable Investment Reaches All-Time High',
      link: 'https://example.com/sustainable-investment',
      og: 'https://picsum.photos/400/300?random=7',
      description: 'Green investments see unprecedented growth',
      source: 'Economics Today',
      publishedAt: '2025-01-12T09:30:00Z',
      category: 'Business',
    },
    {
      title: 'Startup Funding Sets New Records in 2025',
      link: 'https://example.com/startup-funding',
      og: 'https://picsum.photos/400/300?random=8',
      description: 'Venture capital reaches historic levels this quarter',
      source: 'Startup News',
      publishedAt: '2025-01-12T08:30:00Z',
      category: 'Business',
    },
  ],
  Sports: [
    {
      title: 'Championship Final Delivers Thrilling Conclusion',
      link: 'https://example.com/championship-final',
      og: 'https://picsum.photos/400/300?random=9',
      description: 'Epic showdown in championship match keeps fans on edge',
      source: 'Sports Network',
      publishedAt: '2025-01-12T12:00:00Z',
      category: 'Sports',
    },
    {
      title: 'Olympic Training Program Launches New Initiative',
      link: 'https://example.com/olympic-training',
      og: 'https://picsum.photos/400/300?random=10',
      description: 'Athletes prepare for upcoming Olympic games',
      source: 'Olympic News',
      publishedAt: '2025-01-12T11:30:00Z',
      category: 'Sports',
    },
    {
      title: 'Record-Breaking Performance at World Championships',
      link: 'https://example.com/world-record',
      og: 'https://picsum.photos/400/300?random=11',
      description: 'Athlete sets new world record in spectacular fashion',
      source: 'Athletics Weekly',
      publishedAt: '2025-01-12T10:00:00Z',
      category: 'Sports',
    },
  ],
  Science: [
    {
      title: 'Space Mission Discovers New Exoplanet',
      link: 'https://example.com/exoplanet-discovery',
      og: 'https://picsum.photos/400/300?random=12',
      description: 'NASA announces discovery of potentially habitable planet',
      source: 'Space Science',
      publishedAt: '2025-01-12T13:00:00Z',
      category: 'Science',
    },
    {
      title: 'Medical Breakthrough in Cancer Treatment',
      link: 'https://example.com/cancer-treatment',
      og: 'https://picsum.photos/400/300?random=13',
      description: 'New therapy shows promising results in clinical trials',
      source: 'Medical Journal',
      publishedAt: '2025-01-12T12:30:00Z',
      category: 'Science',
    },
  ],
};

export const mockGermanNewsData: NewsByCategory = {
  Technologie: [
    {
      title: 'Revolutionärer KI-Durchbruch verändert die Industrie',
      link: 'https://example.com/ki-durchbruch',
      og: 'https://picsum.photos/400/300?random=14',
      description:
        'Wissenschaftler verkünden großen Fortschritt in der KI-Technologie',
      source: 'Tech Nachrichten',
      publishedAt: '2025-01-12T10:00:00Z',
      category: 'Technologie',
    },
    {
      title: 'Neue Smartphone-Funktionen werden mobiles Computing verändern',
      link: 'https://example.com/smartphone-funktionen',
      og: 'https://picsum.photos/400/300?random=15',
      description:
        'Neueste Smartphone-Veröffentlichung enthält bahnbrechende Funktionen',
      source: 'Mobile Tech',
      publishedAt: '2025-01-12T09:00:00Z',
      category: 'Technologie',
    },
    {
      title: 'Quantencomputer macht großen Sprung nach vorn',
      link: 'https://example.com/quantencomputer',
      og: 'https://picsum.photos/400/300?random=16',
      description: 'Forscher erreichen neuen Meilenstein im Quantencomputing',
      source: 'Wissenschaft Aktuell',
      publishedAt: '2025-01-12T08:00:00Z',
      category: 'Technologie',
    },
  ],
  Wirtschaft: [
    {
      title: 'Globale Märkte reagieren auf wirtschaftspolitische Änderungen',
      link: 'https://example.com/markt-reaktion',
      og: 'https://picsum.photos/400/300?random=17',
      description: 'Aktienmärkte zeigen positive Reaktion auf neue Politik',
      source: 'Finanzen Times',
      publishedAt: '2025-01-12T11:00:00Z',
      category: 'Wirtschaft',
    },
    {
      title: 'Tech-Giganten verkünden Rekordgewinne',
      link: 'https://example.com/tech-gewinne',
      og: 'https://picsum.photos/400/300?random=18',
      description:
        'Große Technologieunternehmen melden starke Finanzergebnisse',
      source: 'Business Woche',
      publishedAt: '2025-01-12T10:30:00Z',
      category: 'Wirtschaft',
    },
  ],
  Sport: [
    {
      title: 'Meisterschaftsfinale liefert spannendes Ende',
      link: 'https://example.com/meisterschaft-finale',
      og: 'https://picsum.photos/400/300?random=19',
      description: 'Episches Duell im Meisterschaftsspiel hält Fans in Atem',
      source: 'Sport Netzwerk',
      publishedAt: '2025-01-12T12:00:00Z',
      category: 'Sport',
    },
  ],
};
