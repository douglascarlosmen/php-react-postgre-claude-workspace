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
