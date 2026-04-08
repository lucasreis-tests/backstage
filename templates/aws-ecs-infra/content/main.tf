locals {
  azs = slice(data.aws_availability_zones.available.names, 0, 3)
}

data "aws_availability_zones" "available" {
  state = "available"
}

# ─── VPC ──────────────────────────────────────────────
module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
  environment  = var.environment
  vpc_cidr     = var.vpc_cidr
  azs          = local.azs
}

# ─── ECR ──────────────────────────────────────────────
module "ecr" {
  source       = "./modules/ecr"
  project_name = var.project_name
}

# ─── RDS PostgreSQL ───────────────────────────────────
module "rds" {
  source                = "./modules/rds"
  project_name          = var.project_name
  environment           = var.environment
  vpc_id                = module.vpc.vpc_id
  db_subnet_ids         = module.vpc.database_subnet_ids
  db_instance_class     = var.db_instance_class
  ecs_security_group_id = module.ecs.ecs_security_group_id
}

# ─── ALB ──────────────────────────────────────────────
module "alb" {
  source          = "./modules/alb"
  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  public_subnets  = module.vpc.public_subnet_ids
  container_port  = var.container_port
  certificate_arn = var.certificate_arn
}

# ─── ECS Fargate ──────────────────────────────────────
module "ecs" {
  source               = "./modules/ecs"
  project_name         = var.project_name
  environment          = var.environment
  aws_region           = var.aws_region
  vpc_id               = module.vpc.vpc_id
  private_subnets      = module.vpc.private_subnet_ids
  alb_target_group_arn = module.alb.target_group_arn
  alb_security_group_id = module.alb.security_group_id
  ecr_repository_url   = module.ecr.repository_url
  container_port       = var.container_port
  cpu                  = var.ecs_cpu
  memory               = var.ecs_memory
  desired_count        = var.ecs_desired_count
  db_secret_arn        = module.rds.db_secret_arn
  db_host              = module.rds.db_endpoint
  db_port              = module.rds.db_port
}

# ─── WAF ──────────────────────────────────────────────
module "waf" {
  source       = "./modules/waf"
  project_name = var.project_name
  alb_arn      = module.alb.alb_arn
}

# ─── Monitoring ───────────────────────────────────────
module "monitoring" {
  source                 = "./modules/monitoring"
  project_name           = var.project_name
  environment            = var.environment
  ecs_cluster_name       = module.ecs.cluster_name
  ecs_service_name       = module.ecs.service_name
  alb_arn_suffix         = module.alb.alb_arn_suffix
  target_group_arn_suffix = module.alb.target_group_arn_suffix
  rds_instance_id        = module.rds.db_instance_id
}
