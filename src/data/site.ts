// Facts below are copied from portofcentralia.com (checked Oct 31, 2026).
// Anything not on that site is marked PLACEHOLDER where it appears.

export const OFFICIAL_SITE = 'https://portofcentralia.com';

export const contact = {
  phone: '360-736-3527',
  phoneHref: 'tel:+13607363527',
  fax: '360-330-5666',
  email: 'info@portofcentralia.com',
  street: '3508 Galvin Road',
  city: 'Centralia',
  region: 'WA',
  postalCode: '98531',
  hours: 'Monday to Friday, 8:00 am to 5:00 pm',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=3508+Galvin+Road+Centralia+WA+98531',
};

export const social = [
  { name: 'Facebook', href: 'https://www.facebook.com/portofcentralia', icon: 'facebook' },
  { name: 'YouTube', href: 'https://www.youtube.com/@portofcentralia', icon: 'youtube' },
] as const;

export const nav = [
  {
    label: 'About',
    items: [
      { label: 'Commissioners', href: '/about/commissioners' },
      { label: 'History', href: '/about/history' },
      { label: 'Master Plan', href: '/about/master-plan' },
    ],
  },
  {
    label: 'Industrial Parks',
    items: [
      { label: 'Park I', href: '/industrial-parks/park-1' },
      { label: 'Park II', href: '/industrial-parks/park-2' },
      { label: 'Park 3', href: '/industrial-parks/park-3' },
    ],
  },
  {
    label: 'Do Business',
    items: [
      { label: 'Available Sites', href: '/do-business/sites' },
      { label: 'Incentives & Bonds', href: '/do-business/incentives' },
      { label: 'Foreign Trade Zone', href: '/do-business/foreign-trade-zone' },
      { label: 'Contractor Rosters', href: '/do-business/rosters' },
    ],
  },
  {
    label: 'Meetings & Documents',
    items: [
      { label: 'Agendas & Minutes', href: '/meetings' },
      { label: 'Meeting Videos', href: '/meetings#videos' },
      { label: 'Public Notices', href: '/notices' },
      { label: 'Newsletters', href: '/newsletters' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Contact', href: '/#contact' },
];

export const documents = {
  bondOverview: `${OFFICIAL_SITE}/wp-content/uploads/2022/11/PoC_BondOverview.pdf`,
  masterPlan: `${OFFICIAL_SITE}/wp-content/uploads/2022/12/2023-Port-of-Centralia-Master-Plan-Ray.pdf`,
  smallWorksApplication: `${OFFICIAL_SITE}/wp-content/uploads/2022/12/2026-Small-Works-Roster-Application.pdf`,
  aeForm330: `${OFFICIAL_SITE}/wp-content/uploads/2022/11/SF330-16f.pdf`,
  meetingVideos: 'https://www.youtube.com/@portofcentralia',
};

export const infrastructure = [
  { text: 'Union Pacific / BNSF rail service', icon: 'train' },
  { text: '4-inch natural gas line', icon: 'flame' },
  { text: '10-inch water mains at 100 PSI', icon: 'droplet' },
  { text: '10-inch sewer mains with 6-inch stubs to each lot', icon: 'pipe' },
  { text: 'Electricity for nearly any demand', icon: 'bolt' },
  { text: 'Broadband from multiple providers', icon: 'wifi' },
  { text: 'Foreign Trade Zone designation', icon: 'globe' },
] as const;

export const incentives = [
  'Access to low-interest Industrial Development Revenue Bonds',
  'No state or local income tax on corporate profits',
  'No local B&O taxes',
  'Rural County sales/use tax deferral on buildings and equipment during construction',
  'Rural County B&O tax credits for new employees',
  'Warehouse tax remittance eligibility',
];

// Wording kept from the Port's current footer. The live site shows a stray
// ellipsis inside "national origin"; it is corrected here.
export const usdaStatement =
  'In accordance with Federal law and US Department of Agriculture policy, this institution is prohibited from discriminating on the basis of race, color, national origin, age, disability, religion, sex, and familial status. (Not all prohibited bases apply to all programs.) To file a complaint of discrimination, write USDA, Director, Office of Civil Rights, 1400 Independence Avenue SW, Washington, DC, 20250-9410, or call (800) 795-3272 (voice) or (202) 720-6382 (TDD).';
