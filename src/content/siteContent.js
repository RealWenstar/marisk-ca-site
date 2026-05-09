// Marisk.ca personal-memory site content
// 2026-05-08 rebuild — Bogdan-approved restructure
//
// Tone: site is NOT for client acquisition. The founder closed the company.
// This is a remembrance / legacy page with a curated photo archive.
// All gallery items are keyed to MANIFEST_2026-05-08.json via `manifestKey`.

export const siteContent = {
  brand: {
    name: "Marisk Services Inc.",
    shortName: "Marisk",
    label: "Calgary landscape design and construction · 2003 – 2025",
    founded: "2003",
  },
  marketing: {
    hero: {
      eyebrow: "Calgary, Alberta · 2003 – 2025",
      title: "Landscapes shaped by hand, season after season.",
      subtitle:
        "A founder-led Calgary landscape company, retired in 2025. This page keeps the work in one place — patios laid, walls built, roofs planted.",
      supporting:
        "Hardscape, planting, and specialty green-roof projects across two decades of Calgary seasons.",
      highlights: ["Hardscape & stonework", "Planting & lawn", "Green-roof specialty"],
      // No CTAs — site is not for sales.
      // Hero: residential family vibe (per Bogdan 2026-05-08 afternoon pivot away from hospital cinematic).
      // mrsk-patio-0003 = retaining wall + step risers + planting beds — combines stonework and horticulture,
      // matches "family-led, husband-and-wife team" tone better than commercial green-roof aerials.
      heroImageKey: "mrsk-patio-0003",
    },
    proof: [
      {
        value: "2003",
        label: "Founded",
        detail: "Marisk Services Inc. began as a Calgary landscape and horticultural company.",
      },
      {
        value: "20+ years",
        label: "Of Calgary projects",
        detail: "Residential gardens, hardscape, commercial sites, and specialty green-roof work.",
      },
      {
        value: "Founder-led",
        label: "Horticultural roots",
        detail: "Built around hands-on horticulture, forestry, and landscape field experience.",
      },
    ],
    intro: {
      title: "Two decades of Calgary landscape work, kept in one quiet archive.",
      paragraphs: [
        "Marisk grew from Alexander Markovin and Galina Nikitina's horticultural and landscape field experience in Calgary — golf courses, greenhouses, plant propagation, and the residential gardens that became the company's everyday work.",
        "The work shown here is what the team built between 2003 and 2025: planting plans, hardscape, retaining walls, lawns, and specialty green-roof gardens. Each project was shaped around the site, the way the space would be used, and Calgary's climate.",
      ],
    },
  },
  services: {
    eyebrow: "What Marisk did",
    title: "Practical landscape work, end to end.",
    lead:
      "From planting plans to hardscape and seasonal care — the scope of services Marisk offered Calgary clients across two decades.",
    items: [
      {
        title: "Landscape design & construction",
        description:
          "Design ideas, planning, and construction shaped around each site, the client's preferences, and the budget at hand.",
      },
      {
        title: "Trees, shrubs & flowers",
        description:
          "Planting of trees, shrubs, perennials, annuals, and flowers, with practical care and nurturing advice for Calgary conditions.",
      },
      {
        title: "Sod & lawn installation",
        description:
          "Sod installation and lawn finishing for faster curb appeal and a cleaner usable outdoor surface.",
      },
      {
        title: "Seasonal maintenance",
        description:
          "Spring and fall cleanups, summer maintenance, and winter snow removal — year-round property care.",
      },
      {
        title: "Patios, walkways & retaining walls",
        description:
          "Brick patios, masonry and stone walkways, stairs, planters, retaining walls, and related hardscape features.",
      },
      {
        title: "Water, rock & specialty features",
        description:
          "Ponds, waterfalls, pebble fountains, rock gardens, backyard putting greens, and other custom landscape details.",
      },
      {
        title: "Green-roof projects",
        description:
          "Specialty green-roof after-surface work — gardens and walkways installed with proven green-roof technologies.",
      },
    ],
  },
  history: {
    eyebrow: "About",
    title: "A founder-led Calgary landscape company with horticultural roots.",
    lead:
      "Marisk began in 2003 and grew from Alexander Markovin and Galina Nikitina's horticultural and landscape experience.",
    paragraphs: [
      "After moving to Canada, Alexander and Galina worked in Calgary-area horticulture — golf courses, greenhouse management, and wood-plant propagation.",
      "Their private landscaping and gardening work grew into Marisk Services Inc., serving residential gardens, commercial sites, industrial landscaping, and green-roof projects.",
      "The company focus stayed on practical landscape work, steady project care, and finished outdoor spaces clients could compare year after year.",
    ],
    timeline: [
      { year: "Before Marisk", text: "The founders build horticulture, forestry, greenhouse, and landscape field experience." },
      { year: "Early 2000s", text: "Alexander and Galina begin Calgary-area horticultural and landscape work." },
      { year: "2003", text: "Marisk Services Inc. is launched as a Calgary landscape and horticultural services company." },
      { year: "2003 – 2025", text: "Two decades of residential, commercial, and specialty green-roof projects across Calgary." },
      { year: "2025", text: "The company closes. This page keeps the project archive in one place." },
    ],
  },
  galleryExplorer: {
    eyebrow: "Gallery",
    title: "A walk through the Marisk project archive.",
    lead:
      "Choose where to start — residential landscape and hardscape, or specialty commercial green-roof work.",
    prompt: "Where would you like to start?",
    promptDetail:
      "Pick a path, then open a category to see project photographs.",
    types: [
      {
        id: "landscape",
        label: "Landscape & hardscape",
        summary: "Patios, retaining walls, fences, planting — the everyday Marisk work.",
        detail: "Residential landscape projects: stonework, paver patios, retaining walls with step risers, fences, and planting beds.",
        manifestKey: "mrsk-patio-0001",
        heading: "Residential landscape and hardscape projects.",
        description:
          "Patios laid, walls built, fences set — the Marisk core. Each photograph is from a finished Calgary project between 2003 and 2025.",
        subcategories: [
          {
            id: "patios",
            label: "Patios & retaining walls",
            summary: "Paver patios, stone joints, retaining walls with step risers.",
            manifestKey: "mrsk-patio-0001",
            description:
              "Hardscape work using interlocking pavers, stone, and integrated planting beds.",
            previewLimit: 6,
            items: [
              {
                type: "photo",
                label: "Hardscape",
                manifestKey: "mrsk-patio-0001",
              },
              {
                type: "photo",
                label: "Hardscape",
                manifestKey: "mrsk-patio-0002",
              },
              {
                type: "photo",
                label: "Hardscape",
                manifestKey: "mrsk-patio-0003",
              },
              {
                type: "photo",
                label: "Hardscape",
                manifestKey: "mrsk-patio-0004",
              },
            ],
          },
          {
            id: "fences",
            label: "Fences & privacy",
            summary: "Wooden fences, post caps, and adjacent plantings.",
            manifestKey: "mrsk-fence-0001",
            description:
              "Residential fence work, integrated with mature plantings and finished landscape edges.",
            previewLimit: 6,
            items: [
              {
                type: "photo",
                label: "Fence",
                manifestKey: "mrsk-fence-0001",
              },
              {
                type: "photo",
                label: "Fence",
                manifestKey: "mrsk-fence-0002",
              },
              {
                type: "photo",
                label: "Fence",
                manifestKey: "mrsk-fence-0003",
              },
            ],
          },
        ],
      },
      {
        id: "commercial",
        label: "Commercial green roof",
        summary: "Specialty rooftop sedum gardens — Foothills Hospital, Bow Valley, and others.",
        detail: "Marisk's specialty: green-roof after-surfaces for Calgary commercial buildings.",
        manifestKey: "mrsk-hero-0001",
        heading: "Commercial green-roof projects.",
        description:
          "Specialty installations on Calgary commercial buildings — sedum plantings, rooftop service paths, and modern green-roof systems.",
        subcategories: [
          {
            id: "foothills",
            label: "Foothills Hospital",
            summary: "Hospital rooftop sedum gardens with mature plantings.",
            manifestKey: "mrsk-hero-0001",
            description:
              "One of Marisk's signature commercial installations — sedum plantings and gravel service paths on the Foothills Hospital roof.",
            previewLimit: 6,
            items: [
              {
                type: "photo",
                label: "Foothills Hospital",
                manifestKey: "mrsk-hero-0001",
              },
              {
                type: "photo",
                label: "Foothills Hospital",
                manifestKey: "mrsk-green-roof-0001",
              },
              {
                type: "photo",
                label: "Foothills Hospital",
                manifestKey: "mrsk-green-roof-0002",
              },
            ],
          },
          {
            id: "bow-valley",
            label: "Bow Valley",
            summary: "Downtown Calgary rooftop sedum against the city skyline.",
            manifestKey: "mrsk-hero-0002",
            description:
              "Bow Valley green roof — sedum plantings on a downtown Calgary commercial building.",
            previewLimit: 6,
            items: [
              {
                type: "photo",
                label: "Bow Valley",
                manifestKey: "mrsk-hero-0002",
              },
              {
                type: "photo",
                label: "Bow Valley",
                manifestKey: "mrsk-green-roof-0003",
              },
              {
                type: "photo",
                label: "Bow Valley",
                manifestKey: "mrsk-green-roof-0006",
              },
            ],
          },
          {
            id: "other-sites",
            label: "Other sites",
            summary: "Peter Lougheed Hospital and downtown specialty projects.",
            manifestKey: "mrsk-green-roof-0004",
            description:
              "Other commercial green-roof installations — Peter Lougheed Hospital and downtown Calgary specialty roofs.",
            previewLimit: 6,
            items: [
              {
                type: "photo",
                label: "Peter Lougheed",
                manifestKey: "mrsk-green-roof-0004",
              },
              {
                type: "photo",
                label: "Downtown",
                manifestKey: "mrsk-green-roof-0005",
              },
            ],
          },
        ],
      },
    ],
  },
  specialty: {
    eyebrow: "Green roof / specialty",
    title: "Green-roof gardens were part of Marisk's commercial project work.",
    paragraphs: [
      "Green roofs use specialised planting systems that can cool surrounding air, help block noise, lower fire risk, and create a more attractive alternative to gravel or asphalt rooftops.",
      "For these projects, Marisk typically worked with roofing companies on the roof installation itself, then applied the green after-surfaces — gardens, walkways, and planted systems.",
    ],
    callouts: ["Modern architecture", "Green-roof technology", "Gardens and walkways", "Roofing-partner coordination"],
  },
  team: {
    eyebrow: "Team",
    title: "A founder-led horticultural team.",
    lead:
      "Marisk stayed founder-led from 2003 to 2025 — the company never grew past its horticultural roots.",
    people: [
      {
        name: "Alexander Markovin",
        role: "Founder · President, Marisk Services Inc.",
        detail: "Project lead with horticulture, forestry, landscape, and Calgary field experience.",
      },
      {
        name: "Galina Nikitina",
        role: "Co-founder · Horticultural specialist",
        detail: "Wood-plant propagation and landscape expertise — co-founding partner from the company's start.",
      },
    ],
  },
  contact: {
    title: "Closing notes.",
    lead:
      "Marisk Services Inc. closed in 2025. This page is kept as a personal record of the work, not as an active business contact point.",
    phone: { label: "Historical phone", display: "403.807.3913", href: "tel:+14038073913" },
    email: { label: "Historical email", display: "amarkov@marisk.ca", href: "mailto:amarkov@marisk.ca" },
    location: "Calgary, Alberta, Canada",
    note: "No new project intake. The contact lines above are kept for archival and personal reference.",
  },
  footer: "Marisk Services Inc. · Calgary, 2003 – 2025.",
};
