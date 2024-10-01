import { storage } from "@forge/api";

export interface RandomUserPreferences {
  gender: "female" | "male" | "random";
}

export class RandomUserPreferencesForgeStorage {
  private static DEFAULT_STORAGE_KEY = "RANDOM_USER_PREFERENCES";
  constructor(
    private storageKey = RandomUserPreferencesForgeStorage.DEFAULT_STORAGE_KEY,
  ) {}

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
