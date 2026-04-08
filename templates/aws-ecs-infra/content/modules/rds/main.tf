variable "project_name" { type = string }
variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "db_subnet_ids" { type = list(string) }
variable "db_instance_class" { type = string }
variable "ecs_security_group_id" { type = string }

# ─── Random password ─────────────────────────────────
resource "random_password" "db" {
  length  = 32
  special = false
}

# ─── Secrets Manager ─────────────────────────────────
resource "aws_secretsmanager_secret" "db" {
  name                    = "${var.project_name}-db-credentials"
  recovery_window_in_days = 7
}

resource "aws_secretsmanager_secret_version" "db" {
  secret_id = aws_secretsmanager_secret.db.id
  secret_string = jsonencode({
    username = "backstage"
    password = random_password.db.result
    dbname   = "backstage"
  })
}

# ─── Security Group ──────────────────────────────────
resource "aws_security_group" "rds" {
  name_prefix = "${var.project_name}-rds-"
  vpc_id      = var.vpc_id
  description = "RDS PostgreSQL security group"

  ingress {
    description     = "PostgreSQL from ECS"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.ecs_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound"
  }

  lifecycle { create_before_destroy = true }

  tags = { Name = "${var.project_name}-rds-sg" }
}

# ─── Subnet Group ────────────────────────────────────
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db"
  subnet_ids = var.db_subnet_ids
  tags       = { Name = "${var.project_name}-db-subnet-group" }
}

# ─── RDS Instance ────────────────────────────────────
resource "aws_db_instance" "main" {
  identifier     = "${var.project_name}-db"
  engine         = "postgres"
  engine_version = "16.13"
  instance_class = var.db_instance_class

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"
  storage_encrypted     = true

  db_name  = "backstage"
  username = "backstage"
  password = random_password.db.result

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  multi_az                = var.environment == "production"
  backup_retention_period = 7
  deletion_protection     = true
  skip_final_snapshot     = false
  final_snapshot_identifier = "${var.project_name}-final-snapshot"

  performance_insights_enabled = true
  monitoring_interval          = 60
  monitoring_role_arn          = aws_iam_role.rds_monitoring.arn

  publicly_accessible    = false
  copy_tags_to_snapshot  = true
  apply_immediately      = false

  tags = { Name = "${var.project_name}-db" }
}

# ─── Enhanced Monitoring Role ────────────────────────
resource "aws_iam_role" "rds_monitoring" {
  name = "${var.project_name}-rds-monitoring"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "monitoring.rds.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "rds_monitoring" {
  role       = aws_iam_role.rds_monitoring.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

# ─── Outputs ─────────────────────────────────────────
output "db_endpoint" { value = split(":", aws_db_instance.main.endpoint)[0] }
output "db_port" { value = aws_db_instance.main.port }
output "db_secret_arn" { value = aws_secretsmanager_secret.db.arn }
output "db_instance_id" { value = aws_db_instance.main.identifier }
