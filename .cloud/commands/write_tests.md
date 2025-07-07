# Write Tests Command

This command helps write comprehensive tests following TDD principles.

## Usage
```
/write_tests <feature_name>
```

## Test-First Development Process

### 1. Understand Requirements
- What should the feature do?
- What are the expected inputs/outputs?
- What are the error cases?
- What are the edge cases?

### 2. Design Test Structure
```go
// Unit Test Structure
func TestFeatureName(t *testing.T) {
    t.Run("Success case - descriptive name", func(t *testing.T) {
        // Arrange
        // Act  
        // Assert
    })
    
    t.Run("Error case - descriptive name", func(t *testing.T) {
        // Test error handling
    })
    
    t.Run("Edge case - descriptive name", func(t *testing.T) {
        // Test boundaries
    })
}

// Integration Test Structure  
func TestFeatureIntegration(t *testing.T) {
    // Skip in short mode
    if testing.Short() {
        t.Skip("Skipping integration test in short mode")
    }
    
    // Setup test environment
    // Run integration tests
    // Cleanup
}
```

### 3. Test Categories

#### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution
- No database/network calls

#### Integration Tests
- Test component interactions
- May use test database
- Test API endpoints
- Slower but more comprehensive

#### Defensive Programming Tests
- Test error conditions
- Test type assertions
- Test nil/empty inputs
- Test concurrent access

### 4. Common Test Patterns

#### Environment Setup
```go
func TestWithEnvironment(t *testing.T) {
    // Save and restore environment
    original := os.Getenv("KEY")
    os.Setenv("KEY", "test-value")
    defer func() {
        if original != "" {
            os.Setenv("KEY", original)
        } else {
            os.Unsetenv("KEY")
        }
    }()
    
    // Test code here
}
```

#### Table-Driven Tests
```go
func TestValidation(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    bool
        wantErr bool
    }{
        {"valid input", "test@example.com", true, false},
        {"invalid input", "not-an-email", false, true},
        {"empty input", "", false, true},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Validate(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("Validate() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if got != tt.want {
                t.Errorf("Validate() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

#### HTTP Handler Tests
```go
func TestHTTPHandler(t *testing.T) {
    app := fiber.New()
    app.Get("/test", HandlerFunc)
    
    tests := []struct {
        name       string
        method     string
        path       string
        body       string
        wantStatus int
        wantBody   string
    }{
        {"success", "GET", "/test", "", 200, `{"status":"ok"}`},
        {"not found", "GET", "/invalid", "", 404, ""},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            req := httptest.NewRequest(tt.method, tt.path, strings.NewReader(tt.body))
            resp, err := app.Test(req)
            require.NoError(t, err)
            assert.Equal(t, tt.wantStatus, resp.StatusCode)
        })
    }
}
```

### 5. Test Checklist

#### Before Writing Code
- [ ] Write test cases for all requirements
- [ ] Include success scenarios
- [ ] Include failure scenarios  
- [ ] Include edge cases
- [ ] Include defensive programming tests

#### Test Quality
- [ ] Tests are independent
- [ ] Tests are repeatable
- [ ] Tests are fast
- [ ] Tests have clear names
- [ ] Tests check one thing

#### Test Coverage
- [ ] All public functions tested
- [ ] All error paths tested
- [ ] All edge cases tested
- [ ] Integration points tested

### 6. Common Testing Mistakes

1. **Testing Implementation, Not Behavior**
   - Bad: Testing private methods
   - Good: Testing public API behavior

2. **Brittle Tests**
   - Bad: Exact string matching on errors
   - Good: Checking error types/codes

3. **Test Interdependence**
   - Bad: Tests requiring specific order
   - Good: Each test sets up its own state

4. **Missing Cleanup**
   - Bad: Leaving test data in database
   - Good: Using defer for cleanup

5. **Hardcoded Values**
   - Bad: Hardcoded ports, paths
   - Good: Configurable test values

### 7. Testing Tools

```bash
# Run all tests
go test ./...

# Run with coverage
go test -cover ./...

# Run specific test
go test -run TestName ./package

# Run with race detection
go test -race ./...

# Run short tests only (skip integration)
go test -short ./...

# Generate coverage report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

### 8. Example Test File Structure

```go
package handlers

import (
    "testing"
    "os"
    
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

// Test helpers
func setupTest(t *testing.T) func() {
    // Setup code
    return func() {
        // Cleanup code
    }
}

// Unit tests
func TestUnitFunction(t *testing.T) {
    cleanup := setupTest(t)
    defer cleanup()
    
    // Test implementation
}

// Integration tests
func TestIntegration(t *testing.T) {
    if testing.Short() {
        t.Skip("Skipping integration test")
    }
    
    // Integration test implementation
}

// Benchmark tests
func BenchmarkFunction(b *testing.B) {
    for i := 0; i < b.N; i++ {
        // Benchmark code
    }
}
```

### 9. Test Documentation

Always document:
- What the test is testing
- Why certain values are used
- Any special setup required
- Expected behavior

```go
// TestUserCreation verifies that:
// 1. Valid users can be created
// 2. Duplicate emails are rejected  
// 3. Invalid emails are rejected
// 4. Passwords are properly hashed
func TestUserCreation(t *testing.T) {
    // Test implementation
}
```