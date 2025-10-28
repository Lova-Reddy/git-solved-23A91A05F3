# System Architecture - Universal Documentation

## Overview
DevOps Simulator follows a microservices architecture designed for high availability and scalability. This document details both the stable Production and the experimental Development environments.

---

## 1. Core Components

### 1.1. Application Server
* **Technology**: Node.js + Express
* **Production Port**: 8080
* **Development Port**: 3000 (Local)
* **Scaling**: Horizontal auto-scaling enabled (Production) / Manual (Development)
* **Development Features**: Hot reload enabled, Chrome DevTools debugger on port 9229.

### 1.2. Database Layer
* **Database**: PostgreSQL 14
* **Production Config**: Master-slave replication, Daily automated backups.
* **Development Config**: Single local instance, Manual backups only, Auto-seed with test data on startup.

### 1.3. Monitoring System
* **Tool**: Prometheus + Grafana (Production) / Basic console logging + Prometheus (optional) (Development)
* **Metrics**: CPU, Memory, Disk, Network, Build time (Development)
* **Alerts**: Email notifications for critical issues (Production) / Console warnings (Development)
* **Development Feature**: In-development web dashboard.

### 1.4. Container Orchestration (Local Dev Only)
* **Tool**: Docker Compose
* **Services**: App, Database, Redis cache
* **Volume Mounts**: Code directory for hot reload.

### 1.5. Authentication System (Beta Feature)
* **Method**: OAuth2 + JWT
* **Providers**: Google, GitHub (for testing)
* **Sessions**: Redis-based session storage.

---

## 2. Deployment & Workflow

### 2.1. Production Deployment Strategy
* **Method**: Rolling updates
* **Zero-downtime**: Yes
* **Rollback**: Automated on failure

### 2.2. Development Workflow
1.  Make code changes
2.  Auto-reload triggers rebuild
3.  Run unit tests
4.  Check console logs
5.  Commit when ready

---

## 3. Security

| Area | Production Environment | Development Environment |
| :--- | :--- | :--- |
| **Encryption** | SSL/TLS encryption, DB connection encryption | SSL/TLS disabled for local development |
| **Credentials** | Secrets managed by AWS Secrets Manager | Credentials in plain text (dev only) |
| **Access** | Regular security audits | CORS enabled for all origins, Debug endpoints exposed |

---

## 4. Experimental Features

⚠️ **Warning**: The following features are experimental:
* Multi-cloud deployment
* AI-powered log analysis
* Automatic rollback on anomaly detection