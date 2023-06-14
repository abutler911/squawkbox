# Contributing to SquawkBox

First off, thank you for considering contributing to SquawkBox. It's people like you that make SquawkBox such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```bash
git checkout -b feature-325-add-rss-feed
```

## Get the test suite running

Ensure that you can run the test suite. It's always good to have tests pass locally before opening a pull request.

## Did you find a bug?

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/abutler911/squawkbox/issues).

* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/abutler911/squawkbox/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with SquawkBox's master branch:

```bash
git remote add upstream git@github.com:abutler911/squawkbox.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master and push it!

```bash
git checkout feature-325-add-rss-feed
git rebase master
git push --set-upstream origin feature-325-add-rss-feed
```

Go to the [SquawkBox repo](https://github.com/abutler911/squawkbox) and press 'New Pull Request' and fill out the form.

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

## That's it!

Thank you for contributing!

Remember, all contributors to this repository are expected to follow our Code of Conduct.
```
