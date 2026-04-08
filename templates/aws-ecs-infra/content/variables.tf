variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "${{ values.aws_region }}"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "${{ values.environment }}"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "${{ values.name }}"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "${{ values.db_instance_class }}"
}

variable "ecs_cpu" {
  description = "ECS task CPU units"
  type        = number
  default     = ${{ values.ecs_cpu }}
}

variable "ecs_memory" {
  description = "ECS task memory (MiB)"
  type        = number
  default     = ${{ values.ecs_memory }}
}

variable "ecs_desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 2
}

variable "container_port" {
  description = "Application container port"
  type        = number
  default     = ${{ values.container_port }}
}

variable "domain_name" {
  description = "Domain name (leave empty to use ALB DNS)"
  type        = string
  default     = ""
}

variable "certificate_arn" {
  description = "ACM certificate ARN for HTTPS (leave empty for HTTP only)"
  type        = string
  default     = ""
}
