const DEFAULT_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/MPaKN8kjunEFjmin8";
const DEFAULT_GOOGLE_REVIEW_URL = "https://g.page/r/Cfk-DFvV0WpUEAI/review";

export const company = {
  name: "Orion Metal Industries Pty Ltd",
  shortName: "Orion Metal Industries",
  tagline: "Precision. Strength. Quality.",
  secondaryTagline: "Built on Precision Driven by Quality",
  description:
    "Orion Metal Industries Pty Ltd is a Moorabbin, Melbourne sheet metal fabricator serving commercial and industrial clients across Victoria, Australia. We provide laser cutting, bending, fabrication, powder coating and custom assembly from 1A Bibby Ct, Moorabbin VIC 3189 — Australian workshop only.",
  hero: {
    title: "Precision Sheet Metal Fabrication. Built for Industry.",
    subtitle:
      "Laser cutting, bending, fabrication, powder coating and custom assembly for commercial and industrial clients in Moorabbin, Melbourne and across Victoria, Australia.",
  },
  address: {
    street: "1A Bibby Ct",
    suburb: "Moorabbin",
    state: "VIC",
    postcode: "3189",
    country: "Australia",
    full: "1A Bibby Ct, Moorabbin VIC 3189, Australia",
  },
  serviceAreas: [
    "Moorabbin",
    "Cheltenham",
    "Braeside",
    "Clayton",
    "Dandenong",
    "Bayside",
    "South East Melbourne",
    "Greater Melbourne",
    "Victoria",
    "Australia",
  ],
  phone: "+61 402 208 011",
  phoneRaw: "61402208011",
  phoneDisplay: "0402 208 011",
  contactPerson: "Dinesh Kumar",
  email: "info@orionmetalindustries.com.au",
  /** Public Google Business Profile / Maps listing */
  googleBusinessUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim() || DEFAULT_GOOGLE_MAPS_URL,
  /** Direct “Write a review” link for GBP */
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || DEFAULT_GOOGLE_REVIEW_URL,
  social: {
    instagram: "https://www.instagram.com/orionmetalindustries/",
    facebook:
      "https://www.facebook.com/people/Orion-Metal-Industries-Pty-Ltd/61594591923757/",
  },
  location: {
    lat: -37.9369,
    lng: 145.0415,
    mapUrl: "https://maps.app.goo.gl/MPaKN8kjunEFjmin8",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.5!2d145.0415!3d-37.9369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU2JzEzLjAiUyAxNDXCsDAyJzI5LjQiRQ!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau",
  },
  values: [
    {
      title: "Quality Workmanship",
      description: "Skilled craftsmanship on every project.",
    },
    {
      title: "Modern Equipment",
      description: "Advanced technology for precision results.",
    },
    {
      title: "Competitive Pricing",
      description: "Fair, transparent pricing for commercial clients.",
    },
    {
      title: "On Time Delivery",
      description: "Reliable scheduling and dispatch.",
    },
    {
      title: "Customer Satisfaction",
      description: "Responsive service from enquiry to delivery.",
    },
  ],
  capabilities: [
    "Precision laser cutting",
    "Sheet metal bending and folding",
    "Custom metal fabrication",
    "Industrial powder coating",
    "Custom assembly and integration",
  ],
  whatsappMessage:
    "Hi Orion Metal Industries, I would like to enquire about your sheet metal fabrication services.",
};
