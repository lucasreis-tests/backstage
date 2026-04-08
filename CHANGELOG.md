# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-04-08

### Added

- AWS ECS Infrastructure (Terraform) scaffolder template
  - Generates a complete Terraform project following the reference architecture
  - Includes 7 modules: VPC (3-tier subnets, 3 AZs), ECR, RDS PostgreSQL (Multi-AZ, encrypted), ECS Fargate (auto-scaling), ALB, WAF v2 (5 managed rules), CloudWatch monitoring (6 alarms + SNS)
  - Configurable via Backstage UI: region, environment, instance class, CPU/memory, container port
  - GitHub Actions CI pipeline with terraform validate, fmt, and plan
  - README with quick start deploy instructions
  - Publishes to GitHub and registers in Backstage catalog as infrastructure component

## [1.2.0] - 2026-04-08

### Added

- GitHub integration for scaffolder templates — services are now published as repositories on GitHub
- `publish:github` and `catalog:register` steps in NestJS and Node.js templates
- GitHub token injected via AWS Secrets Manager into ECS containers
- Created repositories are automatically registered in the Backstage catalog

### Changed

- Template output now shows links to the GitHub repository and catalog entry instead of plain text

## [1.1.1] - 2026-04-08

### Fixed

- Fixed scaffolder `InputError: No matching integration configuration for host undefined` when creating services from NestJS and Node.js templates
- Removed `repoUrl | projectSlug` annotation from template `catalog-info.yaml` files that referenced an undefined variable after the publish:github step was removed in v1.1.0
- Replaced with `backstage.io/techdocs-ref: dir:.` annotation

## [1.1.0] - 2026-04-08

### Added

- Node.js Backend (Express) scaffolder template with production-ready code
  - Express server with helmet, CORS, compression, and structured logging (pino)
  - Health check endpoint, CRUD routes, unit tests using Node.js test runner
  - Multi-stage Dockerfile with dumb-init and non-root user
  - GitHub Actions CI/CD pipeline (test → build → push to ECR)
- NestJS Backend scaffolder template with production-ready code
  - NestJS 11 with TypeScript, Swagger/OpenAPI documentation
  - Health check via @nestjs/terminus, items CRUD with DTOs and validation
  - Unit tests with Jest, multi-stage Dockerfile
  - GitHub Actions CI/CD pipeline (test → build → push to ECR)
- Both templates include `catalog-info.yaml` for automatic Backstage registration
- Templates registered in production catalog (`app-config.production.yaml`)

### Changed

- Removed GitHub publish and catalog register steps from scaffolder templates for demo-friendly usage
- Templates now only require service name, description, owner, and port (no repository needed)

## [1.0.0] - 2026-04-08

### Added

- Backstage.io application scaffolded with Node.js 22 and Yarn 4.4.1
- Multi-stage Dockerfile for optimized production builds
- Docker Compose setup for local development with PostgreSQL 16
- Production configuration (`app-config.production.yaml`) with SSL database connection
- Guest authentication provider enabled for production with `dangerouslyAllowOutsideDevelopment`
- Allow-all permission policy for full access via guest login
- CSP configuration to support HTTP-only deployments (removed `upgrade-insecure-requests`)

### Infrastructure

- Terraform modules for full AWS deployment (`terraform/`)
- VPC with 3-tier subnet architecture (public, private, database) across 3 AZs
- ECS Fargate cluster with auto-scaling (2-6 tasks, CPU 70% / Memory 80% targets)
- ECS task definition with X86_64 architecture, 1 vCPU, 2GB RAM
- Deployment circuit breaker with automatic rollback
- ECR private repository with scan-on-push and lifecycle policy (keep last 10 images)
- RDS PostgreSQL 16.13 Multi-AZ with encrypted storage (gp3), Performance Insights, and 7-day backups
- Secrets Manager for database credentials (auto-generated 32-char password)
- Application Load Balancer with access logs to encrypted S3 bucket
- WAF v2 with 5 rules: rate limiting (2000 req/5min), Common Rule Set, Known Bad Inputs, SQLi, IP Reputation
- WAF logging to CloudWatch Logs
- VPC Flow Logs for rejected traffic (30-day retention)
- NAT Gateway for private subnet outbound access
- CloudWatch alarms (ECS CPU/Memory, ALB 5xx, RDS CPU/Storage/Connections) with SNS notifications
- Container Insights enabled on ECS cluster
- Deletion protection on RDS and ALB
- S3 bucket public access block and server-side encryption for ALB logs

### Security

- Containers isolated in private subnets with no public IP
- RDS accessible only from ECS security group, not publicly accessible
- Database connections enforced over SSL
- Credentials injected via Secrets Manager (never in plaintext environment variables)
- ALB configured to drop invalid header fields
- TLS 1.3 policy ready for HTTPS when certificate is provided
- All resources tagged with Project, Environment, and ManagedBy

[Unreleased]: https://github.com/your-org/backstage/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/your-org/backstage/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/your-org/backstage/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/your-org/backstage/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/your-org/backstage/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/your-org/backstage/releases/tag/v1.0.0
