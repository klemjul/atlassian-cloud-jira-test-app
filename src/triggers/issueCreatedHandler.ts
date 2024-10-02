/* eslint-disable @typescript-eslint/no-explicit-any */
import { JIRA_ISSUE_RANDOM_USER_KEY } from "../constants";
import {
  RandomUserPreferences,
  randomUserPreferencesStore,
} from "../userPreferencesStore";
import fetchRandomUser from "../fetchRandomUser";

import { properties } from "@forge/api";

interface Issue {
  id: string;
  key: string;
  fields: {
    summary?: string;
    issueType?: any;
    creator?: any;
    created?: string;
    project?: any;
    reporter?: User;
    assignee?: User | null;
    updated?: string;
    status?: any;
  };
}

interface User {
  accountId: string;
}

interface CreatedIssueEvent {
  issue: Issue;
  atlassianId: string;
  associatedUsers: User[];
}

export async function issueCreatedHandler(event: CreatedIssueEvent) {
  const { gender }: RandomUserPreferences =
    await randomUserPreferencesStore.getPreferences();

  const issueKey = event.issue.key;
  const randomUser = await fetchRandomUser(gender);

  await properties
    .onJiraIssue(issueKey)
    .set(JIRA_ISSUE_RANDOM_USER_KEY, randomUser);
}
