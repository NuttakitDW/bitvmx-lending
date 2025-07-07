# Cleanup Worktree Command

## Usage
`/cleanup_worktree <issue_number>`

## Description
Removes a git worktree after completing work on an issue.

## Workflow

1. **Get worktree info**
   ```bash
   issue_number=$1
   worktree_dir="../tpb-issue-${issue_number}"
   branch_name="issue-${issue_number}"
   ```

2. **Check if worktree exists**
   ```bash
   if ! git worktree list | grep -q "${worktree_dir}"; then
     echo "❌ No worktree found for issue #${issue_number}"
     exit 1
   fi
   ```

3. **Save current directory**
   ```bash
   current_dir=$(pwd)
   ```

4. **Ensure we're not in the worktree being removed**
   ```bash
   if [[ "$(pwd)" == *"${worktree_dir}"* ]]; then
     cd ../tpb-e-learning
   fi
   ```

5. **Remove worktree**
   ```bash
   git worktree remove "${worktree_dir}" --force
   echo "✅ Removed worktree: ${worktree_dir}"
   ```

6. **Optional: Delete remote branch**
   ```bash
   echo "Do you want to delete the remote branch ${branch_name}? (y/n)"
   read -r response
   if [[ "$response" == "y" ]]; then
     git push origin --delete "${branch_name}"
     echo "✅ Deleted remote branch: ${branch_name}"
   fi
   ```