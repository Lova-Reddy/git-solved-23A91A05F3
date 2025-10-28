#!/bin/bash
# Universal Deployment Script for DevOps Simulator
# Handles 'production' and 'development' environments

set -e

# --- Configuration Variables ---

# Check for environment variable override, otherwise default to 'production'
DEPLOY_ENV=${1:-"production"}
APP_PORT=""

# --- Set Environment-Specific Config ---

if [ "$DEPLOY_ENV" == "production" ]; then
    echo "====================================="
    echo "DevOps Simulator - Production Deploy"
    echo "====================================="
    DEPLOY_REGION="us-east-1"
    APP_PORT=8080
    echo "Region: $DEPLOY_REGION"
    echo "Port: $APP_PORT"

elif [ "$DEPLOY_ENV" == "development" ]; then
    echo "====================================="
    echo "DevOps Simulator - Development Deploy"
    echo "====================================="
    DEPLOY_MODE="docker-compose"
    APP_PORT=3000
    ENABLE_DEBUG=true
    echo "Mode: $DEPLOY_MODE"
    echo "Port: $APP_PORT"
    echo "Debug: $ENABLE_DEBUG"

else
    echo "Error: Unknown environment '$DEPLOY_ENV'. Use 'production' or 'development'."
    exit 1
fi

# Pre-deployment checks (Common to both)
echo "Running pre-deployment checks..."
if [ ! -f "config/app-config.yaml" ]; then
    echo "Error: Configuration file not found!"
    exit 1
fi

# --- Environment-Specific Deployment Logic ---

echo "Starting $DEPLOY_ENV deployment..."

if [ "$DEPLOY_ENV" == "production" ]; then
    # Production Deployment Logic (from HEAD)
    echo "Pulling latest Docker images..."
    # docker pull devops-simulator:latest

    echo "Rolling update strategy initiated..."
    # kubectl rolling-update devops-simulator

    echo "Deployment completed successfully!"
    echo "Application available at: https://app.example.com"

elif [ "$DEPLOY_ENV" == "development" ]; then
    # Development Deployment Logic (from dev)
    echo "Installing dependencies & running tests..."
    npm install
    npm test

    echo "Using Docker Compose..."
    docker-compose up -d

    echo "Waiting for application to be ready..."
    sleep 5

    # Health check
    echo "Performing health check..."
    curl -f http://localhost:$APP_PORT/health || exit 1

    echo "Deployment completed successfully!"
    echo "Application available at: http://localhost:$APP_PORT"
    echo "Hot reload enabled - code changes will auto-refresh"
fi