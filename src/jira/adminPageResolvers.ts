import Resolver from "@forge/resolver";
import {
  RandomUserPreferences,
  randomUserPreferencesStore,
} from "../userPreferencesStore";

const resolver = new Resolver();

resolver.define(
  "setUserPreferences",
  async ({ context, payload }): Promise<void> => {
    await randomUserPreferencesStore.setPreferences(
      payload as RandomUserPreferences,
    );
  },
);

resolver.define(
  "getUserPreferences",
  async ({ context, payload }): Promise<RandomUserPreferences> => {
    return randomUserPreferencesStore.getPreferences();
  },
);

export const adminPageResolvers = resolver.getDefinitions();
