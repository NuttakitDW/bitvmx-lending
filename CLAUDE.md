## Workflow Guidelines

### Command Execution Rules
- **CRITICAL**: You MUST strictly follow ALL defined workflows and commands without deviation
- **NEVER** skip or forget steps in a command sequence - execute every step in order
- **ALWAYS** double-check that you have completed ALL parts of a command before considering it done
- Before taking any action, you must strictly follow the defined workflow in `.cloud/commands`
- If a command has multiple steps, use the TodoWrite tool to track each step and mark them as completed
- If I run /process_issue and that issue is involve with payment read document in docs about payment first.
- Everytime you create issue label p level to issue or what other label that might relate to the issue.
- Everytime I run /review_pr run this first to check CI ./run-ci-local.sh
- Run make lint everytime when review pr and fix if we have lint problem

### Available Commands
Commands are defined in `.cloud/commands/`:
- `/process_issue <number>` - Process GitHub issues with TDD approach
- `/review_pr [number]` - Review pull requests systematically
- `/write_tests <feature>` - Write comprehensive tests before implementation
- `/setup_worktree <issue_number>` - Create a git worktree for parallel work on an issue
- `/cleanup_worktree <issue_number>` - Remove a worktree after completing an issue
- `/list_worktrees` - List all active worktrees and their associated issues

### Development Workflow
1. **Always write tests FIRST** (Test-Driven Development)
2. Set up test environment variables in tests, not globally
3. Ensure tests work in CI environment without external dependencies
4. Use defensive programming with proper error handling
5. Follow existing code patterns and conventions

### Scratchpad Management Rules
- **MANDATORY**: After completing work on any issue, you MUST clear/delete the corresponding scratchpad file
- Scratchpad files are located in the `scratchpads/` directory with naming pattern `{issue_number}.md`
- **WORKFLOW**: When finishing an issue:
  1. Complete all implementation tasks
  2. Verify the solution works correctly
  3. Delete the scratchpad file using the `rm` command (e.g., `rm scratchpads/3.md`)
  4. Confirm deletion by checking the scratchpads directory
- **NEVER** leave old scratchpad files after completing an issue

### Branch Management Rules
- Do not push any code to main branch
- When tackle with any issue create a new branch first