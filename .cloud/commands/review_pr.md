# Review PR Command

This command helps review pull requests systematically.

## Usage
```
/review_pr [pr_number]
```

If no PR number is provided, it will list open PRs.

## Review Checklist

### 1. Overview Analysis
- What does the PR accomplish?
- Does it fully address the linked issue?
- Is the scope appropriate?

### 2. Code Quality
- [ ] Follows project conventions and patterns
- [ ] No code duplication
- [ ] Functions are focused and testable
- [ ] Proper error handling
- [ ] Defensive programming where needed
- [ ] No hardcoded values that should be configurable

### 3. Testing
- [ ] Tests are included for new functionality
- [ ] Tests cover happy path and error cases
- [ ] Tests are self-contained (no external dependencies)
- [ ] Tests set up their own environment
- [ ] Tests clean up after themselves
- [ ] CI tests pass

### 4. Security
- [ ] No exposed secrets or credentials
- [ ] Proper input validation
- [ ] Safe type assertions
- [ ] No SQL injection vulnerabilities
- [ ] Appropriate access controls

### 5. Performance
- [ ] No obvious performance issues
- [ ] Efficient algorithms used
- [ ] No unnecessary database queries
- [ ] Proper resource cleanup

### 6. Documentation
- [ ] Code is self-documenting
- [ ] Complex logic is commented
- [ ] API changes are documented
- [ ] README updated if needed

## Review Output Format

```markdown
## Code Review: PR #XX - [Title]

### Overview
[Brief description of what the PR does]

### ✅ Strengths
- [List positive aspects]
- [Good practices followed]

### 🔍 Issues Found
- **Critical**: [Must fix before merge]
- **Major**: [Should fix before merge]
- **Minor**: [Can be addressed later]

### 💡 Suggestions
- [Improvement suggestions]
- [Alternative approaches]

### 🧪 Testing
- [ ] Adequate test coverage
- [ ] Tests are well-written
- [ ] CI passes

### 🔒 Security
- [ ] No security issues found
- [ ] Proper authentication/authorization

### 📝 Summary
**Verdict**: [APPROVED ✅ | CHANGES REQUESTED 🔄 | REJECTED ❌]

[Final recommendation and any conditions for approval]
```

## Common Issues to Check

### Test-Related
1. **Missing Tests**: New functionality without tests
2. **Environment Dependencies**: Tests requiring specific setup
3. **Test Isolation**: Tests affecting each other
4. **Missing Edge Cases**: Only happy path tested

### Code Quality
1. **Type Assertions**: Using single-value form `.(type)`
2. **Error Handling**: Swallowing errors or generic messages
3. **Resource Leaks**: Not closing connections/files
4. **Magic Numbers**: Hardcoded values without explanation

### Security
1. **Credentials**: Hardcoded secrets or API keys
2. **Input Validation**: Missing validation on user input
3. **SQL Injection**: Raw SQL with user input
4. **Access Control**: Missing authentication checks

### Best Practices
1. **Commit Hygiene**: Large commits mixing concerns
2. **Code Style**: Inconsistent formatting
3. **Documentation**: Missing or outdated docs
4. **Dependencies**: Unnecessary dependencies added

## Review Commands

```bash
# List open PRs
gh pr list

# View PR details
gh pr view <number>

# Get PR diff
gh pr diff <number>

# Check PR status
gh pr status

# View PR checks
gh pr checks <number>
```

## Tips for Effective Reviews

1. **Be Constructive**: Suggest improvements, don't just criticize
2. **Provide Examples**: Show better alternatives when possible
3. **Prioritize Issues**: Mark critical vs nice-to-have changes
4. **Consider Context**: Understand the constraints and requirements
5. **Test Locally**: Pull the branch and test when needed
6. **Check History**: Review commit messages and history

## Example Review Comments

### Good Practice
```markdown
✅ Excellent defensive programming here with the type assertion checks. This prevents potential panics in production.
```

### Suggesting Improvement
```markdown
🔍 Consider adding error handling here:

```go
// Current
result := someFunction()

// Suggested
result, err := someFunction()
if err != nil {
    return fmt.Errorf("failed to process: %w", err)
}
```
```

### Critical Issue
```markdown
🚨 **Critical**: This SQL query is vulnerable to injection:

```go
query := fmt.Sprintf("SELECT * FROM users WHERE id = %s", userID)
```

Use parameterized queries instead:
```go
query := "SELECT * FROM users WHERE id = $1"
rows, err := db.Query(query, userID)
```
```