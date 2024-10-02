# atlassian-cloud-jira-test-app

This project contains a Forge app written in Javascript that that randomly adds generated user information on Jira issues.

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Build and deploy your app by running:

```
forge deploy
```

- Install your app in an Atlassian site by running:

```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:

```
forge tunnel
```

## Next steps

* Replace @forge/api Properties calls (WARN: The @forge/api Properties API is deprecated, you shoud now call product REST APIs directly.)
* Experiment [Atlassian Custom UI](https://developer.atlassian.com/platform/forge/custom-ui/) with [Atlasskit components](https://atlassian.design/components/)
* [Build a Confluence App](https://developer.atlassian.com/platform/forge/build-a-hello-world-app-in-confluence/)