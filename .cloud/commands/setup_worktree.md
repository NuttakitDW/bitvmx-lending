# Setup Worktree Command

## Usage
`/setup_worktree <issue_number>`

## Description
Automatically creates a git worktree for working on a specific issue in parallel with other issues.

## Workflow

1. **Create worktree directory**
   ```bash
   issue_number=$1
   worktree_dir="../tpb-issue-${issue_number}"
   branch_name="issue-${issue_number}"
   ```

2. **Check if worktree already exists**
   ```bash
   if git worktree list | grep -q "${worktree_dir}"; then
     echo "Worktree already exists at ${worktree_dir}"
     cd "${worktree_dir}"
   else
     git worktree add "${worktree_dir}" -b "${branch_name}"
     cd "${worktree_dir}"
   fi
   ```

3. **Setup environment**
   ```bash
   # Copy any necessary environment files
   if [ -f "../tpb-e-learning/.env" ]; then
     cp "../tpb-e-learning/.env" .env
   fi
   ```

4. **Install dependencies**
   ```bash
   go mod download
   ```

5. **Create scratchpad**
   ```bash
   mkdir -p scratchpads
   echo "# Issue #${issue_number} Scratchpad" > "scratchpads/${issue_number}.md"
   echo "Branch: ${branch_name}" >> "scratchpads/${issue_number}.md"
   echo "Worktree: ${worktree_dir}" >> "scratchpads/${issue_number}.md"
   ```

6. **Display next steps**
   ```bash
   echo "✅ Worktree ready at: ${worktree_dir}"
   echo "📝 Branch: ${branch_name}"
   echo "🚀 Next: Run 'claude /process_issue ${issue_number}' in the worktree"
   ```