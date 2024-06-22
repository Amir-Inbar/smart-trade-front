# Makefile for Next.js project

# Variables
PROJECT_NAME = shadcn-sidebar

# Default target
.DEFAULT_GOAL := help

# Help target
help:
	@echo "Available targets:"
	@echo "  dev        - Start the development server"
	@echo "  build      - Build the project for production"
	@echo "  start      - Start the production server"
	@echo "  lint       - Run linter"
	@echo "  install    - Install dependencies"
	@echo "  clean      - Remove node_modules and build directories"
	@echo "  prettier   - Run Prettier to format code"
	@echo "  type-check - Run TypeScript type checking"

# Targets
dev: ## Start the development server
	@echo "Starting development server..."
	npm run dev

build: ## Build the project for production
	@echo "Building the project..."
	npm run build

start: ## Start the production server
	@echo "Starting production server..."
	npm run start

lint: ## Run linter
	@echo "Running linter..."
	npm run lint

install: ## Install dependencies
	@echo "Installing dependencies..."
	npm install

clean: ## Remove node_modules and build directories
	@echo "Cleaning project..."
	rm -rf node_modules .next

prettier: ## Run Prettier to format code
	@echo "Running Prettier..."
	npx prettier --write .

type-check: ## Run TypeScript type checking
	@echo "Running TypeScript type checking..."
	npx tsc --noEmit

codegen: ## Generate schema types
	@echo "Generating schema types..."
	npm run codegen

.PHONY: help dev build start lint install clean prettier type-check
