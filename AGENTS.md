```markdown
# AGENTS.md File Guidelines

These guidelines outline the principles and rules for development of AGENTS.md, ensuring code quality, maintainability, and alignment with best practices. Adherence to these guidelines is mandatory for all AGENTS.md development projects.

## 1. DRY (Don't Repeat Yourself)

*   All logic, data handling, and utility functions must be encapsulated in reusable components.
*   Avoid duplicating code.  Identify and consolidate duplicate functionality.
*   Utilize shared libraries and modular design to minimize code complexity.

## 2. KISS (Keep It Simple, Stupid)

*   Prioritize clarity and readability.  Code should be easily understood by other developers.
*   Keep functions and classes short and focused on a single responsibility.
*   Avoid overly complex logic.  Favor simple, direct solutions.
*   Strive for minimal code.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class or module should have one, and only one, reason to change.
*   **Open/Closed Principle:**  Systems should be extensible without modifying their core implementation.  New functionality should be added through well-defined interfaces.
*   **Liskov Substitution Principle:**  Subclasses must be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:** Clients should not be required to supply an implementation that they do not need.
*   **Dependency Inversion Principle:** High-level modules should not depend on low-level modules.  They should be able to be substituted by abstract interfaces.

## 4. YAGNI (You Aren't Gonna Need It)

*   Do not implement features or code simply because they are possible.
*   Focus on the essential requirements and avoid premature optimization.
*   Refactor only when a fundamental design flaw is identified.

## 5. Code Style & Formatting

*   Follow a consistent code style (e.g., PEP 8 for Python).
*   Use appropriate indentation and spacing.
*   Employ consistent naming conventions.
*   Employ a code formatter (e.g., Black for Python) to automatically enforce formatting rules.

## 6.  Testing

*   All development must be productive. No mocks or fake implementations are allowed.
*   Unit tests will be implemented with a minimum of 80% code coverage.
*   Tests should be independent and easily runnable.
*   Tests should focus on specific units of functionality.
*   Test cases should document expected behavior clearly.

## 7. File Size & Structure

*   Each file should have a maximum of 180 lines of code.
*   Files should be logically grouped into related modules/components.
*   Use descriptive filenames.
*   Include a detailed README with a clear explanation of the file's purpose and dependencies.

## 8. Documentation

*   Provide clear and concise documentation within the code itself, using docstrings.
*   Include comments where necessary to explain complex logic.
*   Maintain a relevant API documentation (e.g., using Sphinx or similar tools).

## 9.  Agencies & Dependencies

*   Dependencies should be explicitly declared in the `requirements.txt` file.
*   Dependency versions should be specified.
*   Use a dependency management tool (e.g., Poetry, Pipenv) for managing dependencies.
*   Dependencies should be versioned, and updates should be carefully considered.

## 10.  Code Quality

*   Prioritize code readability and maintainability.
*   Use meaningful variable and function names.
*   Avoid complex or convoluted code.

## 11.  Test Coverage Metrics

*   Automated test suite with a minimum of 80% code coverage.
*   Regularly run the test suite to identify code gaps.

## 12.  Commiting & Versioning

*   Use a version control system (e.g., Git) to track changes.
*   Commit frequently with clear, concise commit messages.
*   Use branches for development and feature isolation.
```