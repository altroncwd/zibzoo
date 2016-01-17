# Contributing Guide

[tl;dr](http://i.imgur.com/lnxEThG.png) -- NOTE: 'master' should be replaced with 'develop'

## Workflow Overview

1. Fork the repository
1. Create a feature branch from 'develop' describing the specific purpose for the new code, e.g.,
   - navigation bar
1. Only make commits to your feature branch, e.g.,
   - [cleanup] tidy up bantha poodoo
   - [chore] travel to Toshi Station to pick up power converters
   - [doc] add Kamino coordinates to the Jedi Archives
   - [feat] add new algorithm to enable completion of Kessel Run in less than 12 parsecs
   - [fix] repair the hyperdrive, fixes #14
   - [refactor] separate .escapeTheDeathStartAndMakeTheJumpToHyperspace() into two separate functions
   - [test] add testing for pod racer ignition
1. When the fix or feature is complete, rebase upstream changes into the feature branch, push to
   'origin', and submit a pull request to 'develop' with a description of your changes.
1. Your pull request will be reviewed by another maintainer. This will help keep the codebase clean
   and of high quality and, equallyas important, to help you grow as a programmer. If your code
   reviewer requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviewer and push your fixes as a single new commit.
1. Once the pull request has been approved, it will be merged by another member of the team. Do not
   merge your own commits.

## Workflow in Detail

### Fork the repository

Use GitHub's interface to fork of the repository, then add that repository as an upstream remote:

```bash
git remote add upstream https://github.com/unforgitables/zibzoo.git
```

### Create a feature branch from 'develop'

```bash
# Creates your branch and brings you there
git checkout -b `your-feature-branch`
```

### Only make commits to your feature branch

Use one of the prefixes from the following examples:
  - [cleanup] tidy up bantha poodoo
  - [doc] add Kamino coordinates to the Jedi Archives
  - [feat] implement new algorithm to enable completion of Kessel Run in less than 12 parsecs
  - [fix] repair the hyperdrive, fixes #14
  - [refactor] separate .escapeTheDeathStartAndJumpToHyperspeed() into two separate functions
  - [test] add testing for pod racer ignition sequence

Only make changes and commits on your feature branch and make sure that all changes are relevant to
the branch. If you find yourself making unrelated changes, make a new branch for those changes.

#### Commit Message Guidelines

- Commit messages should be written in the imperative, present tense, e.g., "[fix] remove broken
  link in navigation bar, fixes #14".
- The first line of your commit message should be a brief summary of what the commit changes. Aim
  for about 70 characters max. Remember: this is a summary, not a detailed description of
  everything that changed.
- If you want to explain the commit in greater detail, add a blank line below the commit summary
  followed by a more detailed description of the commit below the blank line. This can be as
  detailed as you would like.

### Rebase upstream changes into your feature branch

Once you are done making changes on your feature branch, you can begin the process of getting your
code merged into the main repository. First ensure that all changes have been committed and then
rebase upstream changes that were made to the 'develop' branch into your feature branch by running:

```bash
git fetch upstream
git rebase upstream/develop
```

This will start the rebase process. You must commit all of your changes before doing this. If there
are no conflicts, this should just roll all of your changes on top of the changes from upstream,
leading to a nice, clean, linear commit history.

If there are conflicting changes, Git will pause rebasing to allow you to sort out the conflicts.
You do this the same way you solve merge conflicts, by checking all of the files git says have been
changed in both histories and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much as possible.

You pick a file with `git add` (you do not make commits during a rebase).

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all conflicts, you should run the
existing tests to make sure you didn’t break anything, then run your new tests (there are new
tests, right?) and make sure they also work.

If rebasing broke anything, fix it. Then repeat the above process until you get here again with
nothing broken and all the tests pass.

### Make a pull request

Make a clear pull request from the feature branch from your fork to the upstream 'develop' branch,
detailing exactly what changes were made and what feature this should add. The clearer your pull
request is the faster you can get your changes incorporated into this repository.

At least one other person MUST review the code in your changes. If the new code is deemed
acceptable, the changes will be merged into 'upstream'. Alternatively, if there are some requested
changes, you should make more commits to your branch to fix these, then follow this process again
from rebasing onwards.

Once you get back to this point, make a comment requesting further review and someone will look at
your code again. If they like it, it will get merged, otherwise just repeat the process to make the
necessary changes.

### Important Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
    - Apply the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule)
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the tests before submitting a pull request.
1. Tests are very, very important. Please submit tests if your pull request contains new, testable
   behavior.
1. Your pull request a single, main change.

## Checklist:

This is just to help you organize your process

- [ ] Did I create a new feature branch from 'develop' (don't create new branches from existing
  feature brances)?
- [ ] Did I follow the correct naming convention for my feature branch?
- [ ] Is my branch focused on a single, main change?
  - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream 'develop' branch after I finished all my work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
  - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have no problem getting your
changes merged in.

Thanks for contributing!
