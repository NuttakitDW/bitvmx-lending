# Process Issue Command

This command helps process GitHub issues systematically with best practices.

## Usage
```
/process_issue <issue_number>
```

## Workflow Steps

### 1. Initial Setup
- Create a new branch: `issue-<number>-<brief-description>`
- Create scratchpad file: `scratchpads/<issue_number>.md`
- Use TodoWrite tool to track all tasks

### 2. Analysis Phase
- Fetch issue details from GitHub
- Analyze existing codebase related to the issue
- Document findings in scratchpad
- Identify all files that need to be modified
- Check for existing implementations that might conflict

### 3. Implementation Planning
- Break down the issue into specific tasks
- Identify which files need changes
- Plan the test strategy BEFORE implementing
- Document the implementation plan in scratchpad

### 4. Test-Driven Development (TDD)
- **Write tests FIRST** before implementation
- Create unit tests for new functionality
- Create integration tests for API endpoints
- Ensure tests cover:
  - Happy path scenarios
  - Error cases and edge cases
  - Defensive programming scenarios
  - CI/CD environment compatibility

### 5. Implementation
- Implement the feature/fix
- Follow existing code patterns and conventions
- Add defensive programming where appropriate
- Use proper error handling and status codes
- Add necessary comments and documentation

### 6. Testing & Validation
- Run all tests locally: `go test ./...`
- Ensure no test requires external environment setup
- Fix any failing tests
- Run linter: `make lint` or `make fmt`
- Test in isolation without database when possible

### 7. Commit Strategy
- Make atomic commits with clear messages
- Separate feature changes from formatting changes
- Use conventional commit format:
  ```
  feat: Add feature description
  fix: Fix issue description
  test: Add test description
  refactor: Refactor description
  style: Format/style changes
  docs: Documentation updates
  ```

### 8. Pull Request
- Create PR with comprehensive description
- Include test plan with checkboxes
- Reference the issue number
- Push changes and create PR using `gh pr create`

### 9. Code Review
- Run `/review` to self-review the PR
- Address any issues found
- Ensure CI passes before requesting review

### 10. Cleanup
- After PR is approved/merged, delete the scratchpad file
- Clean up the local branch

## Best Practices

### Testing
1. **Always write tests before implementation**
2. Set up test environment variables in tests, not globally
3. Use proper test cleanup (defer statements)
4. Mock external dependencies when possible
5. Test error cases and defensive programming

### Code Quality
1. Follow existing code patterns
2. Use defensive programming for type assertions
3. Handle all error cases appropriately
4. Keep functions focused and testable
5. Avoid large commits mixing features and formatting

### Environment Setup
1. Tests should be self-contained
2. Set required environment variables in test setup
3. Restore original environment after tests
4. Don't assume external services are available

### Example Test Pattern
```go
func TestFeature(t *testing.T) {
    // Setup environment
    originalEnv := os.Getenv("ENV_VAR")
    os.Setenv("ENV_VAR", "test-value")
    defer func() {
        if originalEnv != "" {
            os.Setenv("ENV_VAR", originalEnv)
        } else {
            os.Unsetenv("ENV_VAR")
        }
    }()
    
    // Test implementation
    // ...
}
```

## Common Issues to Avoid

1. **Missing Tests**: Always write tests first or alongside implementation
2. **Environment Dependencies**: Tests failing in CI due to missing env vars
3. **Large Diffs**: Mixing formatting changes with feature changes
4. **Missing Defensive Programming**: Not checking type assertions
5. **Incomplete Error Handling**: Not handling all error cases
6. **Forgetting Cleanup**: Not deleting scratchpad files after completion

## Checklist Template for Scratchpad

```markdown
# Issue #XX: [Issue Title]

## Task Checklist
- [ ] Create branch
- [ ] Analyze existing code
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Implement feature
- [ ] Run all tests
- [ ] Fix linting issues
- [ ] Create PR
- [ ] Self-review PR
- [ ] Address review comments
- [ ] Delete scratchpad after completion

## Test Plan
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Tests work in CI environment
- [ ] Error cases handled
- [ ] Defensive programming implemented

## Implementation Notes
[Document findings and decisions here]
```