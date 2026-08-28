---
name: Automatic GitHub Sync
description: Ensures all changes made by the agent are automatically committed and pushed to the remote repository.
---

# Automatic GitHub Updates

Whenever you make any changes to the codebase (such as updating components, styling, logic, or assets), you MUST automatically run the git commands to commit and push those changes to the remote repository before concluding the task.

## Workflow

1. Finish all coding and verification tasks.
2. Run `git add .` to stage the changes.
3. Run `git commit -m "[Descriptive commit message]"` summarizing what was changed.
4. Run `git push` to upload the changes to GitHub.
5. You may combine these commands for efficiency, e.g. `git add . ; git commit -m "..." ; git push` (using the correct operator for the OS).
6. Inform the user in your final response that the repository has been updated.
