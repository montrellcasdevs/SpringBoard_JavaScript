// Mock API - Uses localStorage to simulate a backend
const PLANETS_STORAGE_KEY = 'space_travel_planets';
const SPACECRAFTS_STORAGE_KEY = 'space_travel_spacecrafts';

// Initialize mock data in localStorage
function initializeMockData() {
  if (!localStorage.getItem(PLANETS_STORAGE_KEY)) {
    const planets = [
      {
        id: 1,
        name: 'Mercury',
        currentPopulation: 500000,
        pictureUrl: 'https://via.placeholder.com/300?text=Mercury'
      },
      {
        id: 2,
        name: 'Venus',
        currentPopulation: 1200000,
        pictureUrl: 'https://via.placeholder.com/300?text=Venus'
      },
      {
        id: 3,
        name: 'Earth',
        currentPopulation: 5000000,
        pictureUrl: 'https://via.placeholder.com/300?text=Earth'
      },
      {
        id: 4,
        name: 'Mars',
        currentPopulation: 800000,
        pictureUrl: 'https://via.placeholder.com/300?text=Mars'
      },
      {
        id: 5,
        name: 'Jupiter',
        currentPopulation: 2000000,
        pictureUrl: 'https://via.placeholder.com/300?text=Jupiter'
      }
    ];
    localStorage.setItem(PLANETS_STORAGE_KEY, JSON.stringify(planets));
  }

  if (!localStorage.getItem(SPACECRAFTS_STORAGE_KEY)) {
    const spacecrafts = [
      {
        id: 'craft-001',
        name: 'Apollo One',
        capacity: 500,
        description: 'The first interplanetary transport vessel.',
        pictureUrl: 'https://via.placeholder.com/300?text=Apollo+One',
        currentLocation: 3 // Earth
      },
      {
        id: 'craft-002',
        name: 'Endeavor',
        capacity: 1000,
        description: 'A large-capacity spacecraft for mass migration.',
        pictureUrl: 'https://via.placeholder.com/300?text=Endeavor',
        currentLocation: 3 // Earth
      },
      {
        id: 'craft-003',
        name: 'Discovery',
        capacity: 300,
        description: 'Swift explorer for reconnaissance missions.',
        pictureUrl: 'https://via.placeholder.com/300?text=Discovery',
        currentLocation: 4 // Mars
      }
    ];
    localStorage.setItem(SPACECRAFTS_STORAGE_KEY, JSON.stringify(spacecrafts));
  }
}

// Initialize data on module load
initializeMockData();

export const SpaceTravelMockApi = {
  getPlanets: () => {
    try {
      const planets = JSON.parse(localStorage.getItem(PLANETS_STORAGE_KEY)) || [];
      return { isError: false, data: planets };
    } catch (error) {
      return { isError: true, data: null };
    }
  },

  getSpacecrafts: () => {
    try {
      const spacecrafts = JSON.parse(localStorage.getItem(SPACECRAFTS_STORAGE_KEY)) || [];
      return { isError: false, data: spacecrafts };
    } catch (error) {
      return { isError: true, data: null };
    }
  },

  getSpacecraftById: ({ id }) => {
    try {
      const spacecrafts = JSON.parse(localStorage.getItem(SPACECRAFTS_STORAGE_KEY)) || [];
      const spacecraft = spacecrafts.find(s => s.id === id);
      if (!spacecraft) {
        return { isError: true, data: null };
      }
      return { isError: false, data: spacecraft };
    } catch (error) {
      return { isError: true, data: null };
    }
  },

  createSpacecraft: ({ name, capacity, description, pictureUrl }) => {
    try {
      const spacecrafts = JSON.parse(localStorage.getItem(SPACECRAFTS_STORAGE_KEY)) || [];
      const newSpacecraft = {
        id: `craft-${Date.now()}`,
        name,
        capacity,
        description,
        pictureUrl: pictureUrl || 'https://via.placeholder.com/300?text=New+Spacecraft',
        currentLocation: 3 // Earth (planet id 3)
      };
      spacecrafts.push(newSpacecraft);
      localStorage.setItem(SPACECRAFTS_STORAGE_KEY, JSON.stringify(spacecrafts));
      return { isError: false, data: newSpacecraft };
    } catch (error) {
      return { isError: true, data: null };
    }
  },

  destroySpacecraftById: ({ id }) => {
    try {
      const spacecrafts = JSON.parse(localStorage.getItem(SPACECRAFTS_STORAGE_KEY)) || [];
      const filteredSpacecrafts = spacecrafts.filter(s => s.id !== id);
      if (filteredSpacecrafts.length === spacecrafts.length) {
        return { isError: true, data: null }; // Spacecraft not found
      }
      localStorage.setItem(SPACECRAFTS_STORAGE_KEY, JSON.stringify(filteredSpacecrafts));
      return { isError: false, data: null };
    } catch (error) {
      return { isError: true, data: null };
    }
  },

  sendSpacecraftToPlanet: ({ spacecraftId, targetPlanetId }) => {
    try {
      const spacecrafts = JSON.parse(localStorage.getItem(SPACECRAFTS_STORAGE_KEY)) || [];
      const planets = JSON.parse(localStorage.getItem(PLANETS_STORAGE_KEY)) || [];

      const spacecraft = spacecrafts.find(s => s.id === spacecraftId);
      const targetPlanet = planets.find(p => p.id === targetPlanetId);
      const currentPlanet = planets.find(p => p.id === spacecraft.currentLocation);

      if (!spacecraft || !targetPlanet || !currentPlanet) {
        return { isError: true, data: null };
      }

      // Check if target planet is same as current location
      if (spacecraft.currentLocation === targetPlanetId) {
        return { isError: true, data: 'Target planet must be different from current location' };
      }

      // Transfer people
      const peopleToTransfer = Math.min(spacecraft.capacity, currentPlanet.currentPopulation);
      currentPlanet.currentPopulation -= peopleToTransfer;
      targetPlanet.currentPopulation += peopleToTransfer;

      // Update spacecraft location
      spacecraft.currentLocation = targetPlanetId;

      localStorage.setItem(SPACECRAFTS_STORAGE_KEY, JSON.stringify(spacecrafts));
      localStorage.setItem(PLANETS_STORAGE_KEY, JSON.stringify(planets));

      return { isError: false, data: null };
    } catch (error) {
      return { isError: true, data: null };
    }
  }
};
