@RTK.md

# Token Efficiency

## RTK (Rust Token Killer)
Always use `rtk` for ALL CLI operations. Automatic hook-based rewriting provides 60-90% token savings.
- Transparent integration: all Bash/PowerShell commands rewritten automatically
- Meta commands: `rtk gain`, `rtk gain --history`, `rtk discover`, `rtk proxy <cmd>`
- No explicit invocation needed - hook handles everything

## Caveman Skill
Always use `caveman` skill for ultra-compressed text responses.
Invoke with: `/caveman` (default intensity)

# MCP Servers Usage

## docker-mcp
**Use when**: You need to manage Docker containers, check service status, or perform general Docker operations.
- List, start, stop, remove containers
- Inspect container logs
- Check resource usage and container health

## mcp-server-docker
**Use when**: You need deep integration with the Docker daemon, deployment automation, or orchestration of multiple containers.
- Advanced container configuration
- Docker Compose stack orchestration
- Custom image management
- Build and deploy pipelines

## postgres-mcp
**Use when**: You need to execute SQL queries, manage schemas, or perform PostgreSQL database operations.
- Execute SELECT, INSERT, UPDATE, DELETE queries
- Create and modify tables and schemas
- Manage indexes and constraints
- Perform backups and restorations
- Check database health and performance

## postgres-full
**Use when**: You need comprehensive PostgreSQL database management with full access capabilities.
- Advanced schema introspection and modification
- Complex query execution with detailed results
- Database backup, restore, and replication management
- Performance tuning and optimization queries
- Advanced security and permission management
- Full transaction control and debugging

## rtk (Rust Token Killer)
**Use when**: You need token-optimized command execution with transparent hook-based filtering.
- Meta commands: `rtk gain`, `rtk gain --history`, `rtk discover`, `rtk proxy <cmd>`
- Automatic command rewriting (e.g., `git status` → `rtk git status`)
- 60-90% token savings on CLI operations
- Hook-based integration with Claude Code

## rsuite
**Use when**: You need to work with React Suite UI components and hooks.
- List available React Suite components and their props
- Search for specific components or hooks
- Get component property definitions and usage patterns
- Find hooks for functional components
- Component integration and customization guidance

# ACC (Architecture, Code, Configuration) Plugin

Advanced agent system for PHP/full-stack development. 73 specialized agents + 26 skills covering architecture, code quality, security, Docker, CI/CD, and testing.

## Quick Start

### Architecture & Design
- `/acc:audit-architecture` — Comprehensive architecture review (layers, coupling, dependencies)
- `/acc:generate-ddd` — DDD building blocks (entities, aggregates, repositories, use cases)
- `/acc:audit-ddd` — DDD pattern compliance audit

### Code Quality & Review
- `/acc:bug-fix` — Diagnose and fix bugs with root cause analysis
- `/acc:audit-test` — Test quality and coverage analysis
- `/acc:audit-performance` — N+1 queries, caching, loop efficiency detection
- `/acc:audit-security` — OWASP vulnerabilities (injection, auth, crypto, validation)

### Docker & Infrastructure
- `/acc:generate-docker` — Dockerfiles, Docker Compose, multi-stage builds
- `/acc:audit-docker` — Security, performance, production readiness audit (via coordinator)

### CI/CD Pipeline
- `/acc:ci-setup` — GitHub Actions / GitLab CI pipeline configuration
- `/acc:ci-fix` — Diagnose and fix CI failures

### Refactoring & Patterns
- `/acc:refactor` — Guided refactoring (readability, SOLID, testability)
- `/acc:generate-patterns` — Design patterns (Factory, Strategy, CQRS, etc.)

### PSR Standards
- `/acc:audit-psr` — PSR-1/12/4 compliance and coding standards
- `/acc:generate-psr` — PSR-compliant loggers, caches, HTTP clients, containers

### Documentation
- `/acc:generate-documentation` — README, API docs, architecture guides, ADRs

## When to Use Agents vs Skills

**Use agents** (`/acc:skill-name`) when:
- Requesting multi-step analysis (audit, refactor, fix)
- Need comprehensive report with findings and recommendations
- Complex task requiring coordination of sub-agents

**Use skills** when:
- Quick knowledge lookup (e.g., `acc:solid-knowledge`, `acc:cqrs-knowledge`)
- Simple templates (e.g., `acc:adr-template`, `acc:readme-template`)
- Specific checks (e.g., `acc:check-sql-injection`, `acc:detect-n-plus-one`)

## RTK Integration with ACC

RTK transparently rewrites commands; ACC agents work alongside:
```bash
rtk gain              # See token savings from this session
rtk discover          # Identify which ACC agents could optimize your workflow
```

# Usage Patterns

## Daily Workflow
1. **Code review**: Use `/acc:audit-performance` + `/acc:audit-security` for PR review
2. **Bug investigation**: Use `/acc:bug-fix` for diagnosis + fix
3. **Refactoring**: Use `/acc:refactor` for guided improvements
4. **Testing**: Use `/acc:audit-test` for coverage gaps + `/acc:generate-test` for new tests

## Architecture Decisions
- Use `/acc:audit-architecture` proactively for layering, coupling issues
- Use `/acc:generate-ddd` when adding new domains or aggregates
- Use `/acc:generate-patterns` for resilience (Circuit Breaker, Retry, Rate Limiter)

## Infrastructure
- Use `/acc:generate-docker` for Dockerfile/Docker Compose setup
- Use `/acc:ci-setup` to establish CI/CD pipelines
- Use `/acc:ci-fix` when builds fail

## Response Compression
Use `/caveman` for ultra-compressed responses (token savings + conciseness):
```bash
/caveman /acc:audit-security    # Run security audit, ultra-compressed output
```

# Quick Reference

| Task | Command |
|------|---------|
| Review PR code | `/acc:audit-performance` + `/acc:audit-security` |
| Fix a bug | `/acc:bug-fix` |
| Add feature safely | `/acc:generate-ddd` (domain) + `/acc:audit-security` |
| Improve code | `/acc:refactor` |
| Set up CI/CD | `/acc:ci-setup` |
| Audit Docker | `/acc:generate-docker` or specific Docker agent |
| Check PSR standards | `/acc:audit-psr` |
| Write documentation | `/acc:generate-documentation` |
| Token savings check | `rtk gain` |
