# List Worktrees Command

## Usage
`/list_worktrees`

## Description
Lists all active git worktrees and their associated issues.

## Workflow

1. **List all worktrees with formatting**
   ```bash
   echo "📁 Active Worktrees:"
   echo "==================="
   ```

2. **Parse and display worktree info**
   ```bash
   git worktree list --porcelain | while read -r line; do
     if [[ $line == worktree* ]]; then
       path=$(echo $line | cut -d' ' -f2)
       if [[ $path == *"tpb-issue-"* ]]; then
         issue_num=$(echo $path | grep -o '[0-9]\+$')
         echo "Issue #${issue_num}: ${path}"
       fi
     elif [[ $line == branch* ]]; then
       branch=$(echo $line | cut -d' ' -f2)
       echo "  └─ Branch: ${branch}"
       echo ""
     fi
   done
   ```

3. **Show summary**
   ```bash
   total=$(git worktree list | grep -c "tpb-issue-")
   echo "Total active issue worktrees: ${total}"
   ```