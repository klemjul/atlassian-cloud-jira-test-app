import { storage } from "@forge/api";
import { RANDOM_USER_PREFERENCES_STORAGE_KEY } from "./constants";

export interface RandomUserPreferences {
  gender: "female" | "male" | "random";
}

export class RandomUserPreferencesForgeStorage {
  constructor(private storageKey = RANDOM_USER_PREFERENCES_STORAGE_KEY) {}

  public async setPreferences(preferences: RandomUserPreferences) {
    await storage.set(this.storageKey, preferences);
  }

  public async getPreferences() {
    return (
      (storage.get(this.storageKey) as Promise<RandomUserPreferences>) ?? {
        gender: "random",
      }
    );
  }
}

export const randomUserPreferencesStore =
  new RandomUserPreferencesForgeStorage();
