import { SpaceTravelMockApi } from './SpaceTravelMockApi';

// This service acts as an abstraction layer for API calls
// In a real application, this would use axios or fetch to call a backend API
// For now, it delegates to the mock API

export const SpaceTravelApi = {
  getPlanets: async () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SpaceTravelMockApi.getPlanets());
      }, 500);
    });
  },

  getSpacecrafts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SpaceTravelMockApi.getSpacecrafts());
      }, 500);
    });
  },

  getSpacecraftById: async (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SpaceTravelMockApi.getSpacecraftById(params));
      }, 500);
    });
  },

  createSpacecraft: async (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SpaceTravelMockApi.createSpacecraft(params));
      }, 500);
    });
  },

  destroySpacecraftById: async (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SpaceTravelMockApi.destroySpacecraftById(params));
      }, 500);
    });
  },

  sendSpacecraftToPlanet: async (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SpaceTravelMockApi.sendSpacecraftToPlanet(params));
      }, 500);
    });
  }
};
