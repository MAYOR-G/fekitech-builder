import json

with open('src/templates/carpenter-website/editable.json', 'r') as f:
    data = json.load(f)

# Update hero image
data['hero']['backgroundImage'] = 'https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&q=80&w=2000'

# Update projects to 8 items
data['projects']['items'] = [
    {
        "title": "Modern Oak Kitchen",
        "category": "Joinery",
        "image": "https://images.unsplash.com/photo-1544164560-adac3045edb2?q=80&w=800"
    },
    {
        "title": "Walnut Dining Suite",
        "category": "Furniture",
        "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800"
    },
    {
        "title": "Herringbone Parquet",
        "category": "Flooring",
        "image": "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?q=80&w=800"
    },
    {
        "title": "Architectural Staircase",
        "category": "Joinery",
        "image": "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=800"
    },
    {
        "title": "Custom Bookshelves",
        "category": "Interior",
        "image": "https://images.unsplash.com/photo-1608613304899-ea8098577e38?q=80&w=800"
    },
    {
        "title": "Outdoor Decking",
        "category": "Exterior",
        "image": "https://images.unsplash.com/photo-1611021061218-761c355ed331?q=80&w=800"
    },
    {
        "title": "Timber Cabin Frame",
        "category": "Construction",
        "image": "https://images.unsplash.com/photo-1626081063434-79a2169791b1?q=80&w=800"
    },
    {
        "title": "Bespoke Door Crafting",
        "category": "Doors",
        "image": "https://images.unsplash.com/photo-1645651964715-d200ce0939cc?q=80&w=800"
    }
]

# Update testimonials to 6 items
data['testimonials']['items'] = [
    {
        "quote": "The bespoke wardrobes they built for our master bedroom are simply stunning. The attention to detail and quality of the finish exceeded all our expectations.",
        "author": "Sarah Jenkins",
        "role": "Homeowner"
    },
    {
        "quote": "Timber & Craft completely transformed our restaurant interior. Their custom tables and bar cladding are the highlight of our space. Highly recommended.",
        "author": "Marcus Thorne",
        "role": "Restaurant Owner"
    },
    {
        "quote": "Absolutely flawless execution. They handled our entire office renovation with precision, completing the woodwork on time and within budget.",
        "author": "David Chen",
        "role": "CEO, TechFlow"
    },
    {
        "quote": "We wanted a unique outdoor seating area and they delivered beyond our imagination. The craftsmanship is evident in every single joint.",
        "author": "Emily Richardson",
        "role": "Homeowner"
    },
    {
        "quote": "Their team is incredibly professional and tidy. Having workers in the house can be disruptive, but they were a pleasure to have around.",
        "author": "James Peterson",
        "role": "Property Developer"
    },
    {
        "quote": "If you want true master carpenters, look no further. The quality of the materials and the skill they bring to the table is unmatched.",
        "author": "Olivia Bennett",
        "role": "Interior Designer"
    }
]

# Add team
data['team'] = {
    "kicker": "Our Team",
    "title": "Meet Our Master Carpenters",
    "items": [
        {
            "name": "William Davies",
            "role": "Founder & Master Carpenter",
            "image": "https://images.unsplash.com/photo-1659930087003-2d64e33181f7?q=80&w=600"
        },
        {
            "name": "Thomas Wright",
            "role": "Senior Joiner",
            "image": "https://images.unsplash.com/photo-1667923006173-9e0d2251f608?q=80&w=600"
        },
        {
            "name": "James Cole",
            "role": "Woodwork Specialist",
            "image": "https://images.unsplash.com/photo-1679797850019-3d0d8659a695?q=80&w=600"
        }
    ]
}

with open('src/templates/carpenter-website/editable.json', 'w') as f:
    json.dump(data, f, indent=2)

