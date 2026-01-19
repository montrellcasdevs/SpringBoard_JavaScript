export const celestialObjects = {
  planets: [
    {
      id: 'mercury',
      title: 'Mercury',
      category: 'planets',
      content: 'Mercury is the smallest planet in our solar system and the closest to the Sun. Despite its proximity to the Sun, it is not the hottest planet. Mercury has a thin atmosphere and experiences extreme temperature fluctuations. It is named after the Roman messenger god due to its swift movement across the sky.'
    },
    {
      id: 'venus',
      title: 'Venus',
      category: 'planets',
      content: 'Venus is the hottest planet in our solar system, with surface temperatures reaching 900°F (475°C). It has a thick atmosphere composed primarily of carbon dioxide, creating a runaway greenhouse effect. Venus rotates backwards compared to most planets and is often called Earth\'s sister planet due to similar size.'
    },
    {
      id: 'earth',
      title: 'Earth',
      category: 'planets',
      content: 'Earth is our home planet and the only known planet to harbor life. It is the third planet from the Sun and features a diverse biosphere, vast oceans, and a protective atmosphere. Earth\'s unique conditions, including liquid water and a magnetic field, make it ideal for life as we know it.'
    },
    {
      id: 'mars',
      title: 'Mars',
      category: 'planets',
      content: 'Mars, known as the Red Planet, is the fourth planet from the Sun. Its reddish appearance is due to iron oxide on its surface. Mars has the largest volcano in the solar system (Olympus Mons) and evidence suggests liquid water once flowed on its surface. It remains a primary target for human exploration.'
    },
    {
      id: 'jupiter',
      title: 'Jupiter',
      category: 'planets',
      content: 'Jupiter is the largest planet in our solar system, a gas giant with at least 79 known moons. It is famous for its Great Red Spot, a storm larger than Earth that has raged for at least 350 years. Jupiter\'s powerful magnetic field and rapid rotation make it a fascinating subject of study.'
    },
    {
      id: 'saturn',
      title: 'Saturn',
      category: 'planets',
      content: 'Saturn is renowned for its spectacular ring system, composed of billions of particles of ice and rock. It is the second-largest planet and a gas giant with at least 82 known moons. Saturn\'s rings are thought to be remnants of destroyed moons or captured comets.'
    }
  ],
  stars: [
    {
      id: 'sirius',
      title: 'Sirius',
      category: 'stars',
      content: 'Sirius, the Dog Star, is the brightest star in Earth\'s night sky. Located in the Canis Major constellation, it is only 8.6 light-years away. Sirius is a binary star system with a white dwarf companion. It has been significant to human cultures throughout history and was used by ancient Egyptians for calendar purposes.'
    },
    {
      id: 'betelgeuse',
      title: 'Betelgeuse',
      category: 'stars',
      content: 'Betelgeuse is a red supergiant star in the Orion constellation. It is one of the largest known stars and is nearing the end of its life cycle. When Betelgeuse explodes as a supernova, it will be visible in daylight from Earth. Its name comes from Arabic, meaning "the shoulder of Orion."'
    },
    {
      id: 'polaris',
      title: 'Polaris',
      category: 'stars',
      content: 'Polaris, known as the North Star, is crucial for navigation in the Northern Hemisphere. It is located almost directly above Earth\'s North Pole. Polaris is actually a triple star system, with the brightest component being a yellow supergiant. Its position makes it invaluable for determining latitude.'
    },
    {
      id: 'vega',
      title: 'Vega',
      category: 'stars',
      content: 'Vega is the fifth-brightest star in Earth\'s night sky and lies 25 light-years away. It is part of the Summer Triangle asterism in the Northern Hemisphere. Vega rotates rapidly, completing one rotation every 12.5 hours, compared to our Sun\'s 25 days. It is surrounded by a disk of dust, suggesting a planetary system may be forming.'
    },
    {
      id: 'proxima-centauri',
      title: 'Proxima Centauri',
      category: 'stars',
      content: 'Proxima Centauri is the closest star to our Sun, located only 4.24 light-years away. It is a red dwarf, much smaller and cooler than our Sun. Recent observations suggest it has at least two planets orbiting it, making it a prime target for future interstellar exploration.'
    }
  ],
  galaxies: [
    {
      id: 'andromeda',
      title: 'Andromeda Galaxy',
      category: 'galaxies',
      content: 'The Andromeda Galaxy is the nearest major galaxy to the Milky Way, located about 2.5 million light-years away. It contains approximately one trillion stars and is larger than our own galaxy. Andromeda is on a collision course with the Milky Way and will merge with it in about 4.5 billion years.'
    },
    {
      id: 'milky-way',
      title: 'Milky Way',
      category: 'galaxies',
      content: 'The Milky Way is our home galaxy, a large barred spiral galaxy. It contains an estimated 100-200 billion stars and is believed to have a supermassive black hole at its center called Sagittarius A*. The Solar System is located in the Orion Spur, roughly 26,000 light-years from the galactic center.'
    },
    {
      id: 'triangulum',
      title: 'Triangulum Galaxy',
      category: 'galaxies',
      content: 'The Triangulum Galaxy is the third-largest galaxy in the Local Group, after the Milky Way and Andromeda. It is located about 3 million light-years away and is a spiral galaxy. The Triangulum Galaxy is on a potential collision course with Andromeda in about 2.5 billion years.'
    },
    {
      id: 'sombrero',
      title: 'Sombrero Galaxy',
      category: 'galaxies',
      content: 'The Sombrero Galaxy, also known as Messier 104, resembles a sombrero hat due to its distinctive structure. It is an unbarred spiral galaxy about 28 million light-years away. The galaxy is notable for its prominent dust lane and massive central bulge, suggesting a supermassive black hole.'
    }
  ]
};

export const getObjectById = (category, id) => {
  return celestialObjects[category]?.find(obj => obj.id === id);
};

export const getObjectsByCategory = (category) => {
  return celestialObjects[category] || [];
};
