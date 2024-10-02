import Resolver from "@forge/resolver";
import { properties } from "@forge/api";
import { JIRA_ISSUE_RANDOM_USER_KEY } from "../constants";
import { RandomUserInfo } from "../fetchRandomUser";

const resolver = new Resolver();

resolver.define(
  "getRandomUser",
  async (req): Promise<RandomUserInfo | undefined> => {
    const issueKey = req.context.extension.issue.key;

    const randomUser: RandomUserInfo | undefined = await properties
      .onJiraIssue(issueKey)
      .get(JIRA_ISSUE_RANDOM_USER_KEY);

    return randomUser;
  },
);

export const issuePanelResolvers = resolver.getDefinitions();
