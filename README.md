# aas-saas-mockapi

## 🎯 Overview
MockAPI is a development and testing utility service that provides mock responses for external APIs, enabling offline development and testing without dependencies on third-party services.

## 📌 Purpose
- Mock external API responses for development
- Enable offline frontend/backend development
- Provide consistent test data for QA
- Fast prototyping without real API dependencies

## 🏗️ Architecture
```
DevPortal/Services → MockAPI → Mock Responses
                        ↓
                  Static Data / Config
```

## 🔧 Setup & Development

| Command                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| `make local`              | Run MockAPI locally (dev mode)                |
| `make dev-build`          | Build Docker image (with cache)               |
| `make dev-build-no-cache` | Build Docker image (no cache)                 |
| `make dev-up`             | Run in Docker (foreground)                    |
| `make dev-up-detached`    | Run in Docker (background)                    |
| `make test-up`            | Run test stack (foreground)                   |
| `make test-up-detached`   | Run test stack (background)                   |
| `make down`               | Stop and remove containers                    |

> **Note:** `prod-up` commands reference non-existent `docker-compose.prod.yml` and are not available.

## 🌐 Mock Endpoints

| Method | Endpoint Pattern          | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| `GET`  | `/api/users`              | Mock user list                       |
| `GET`  | `/api/users/:id`          | Mock user details                    |
| `POST` | `/api/auth/login`         | Mock authentication                  |
| `GET`  | `/api/apps`               | Mock application list                |
| `POST` | `/api/apps`               | Mock app creation                    |
| `GET`  | `/health`                 | Health check endpoint                |

> **Note:** MockAPI endpoints are configurable and can be customized based on project needs.

## 🔗 Dependencies

**Required Services:**
- None (Standalone service for development)

## ⚙️ Configuration

| Variable              | Description                              | Default |
| --------------------- | ---------------------------------------- | ------- |
| `PORT`                | Service port                             | 3002    |
| `MOCK_DELAY`          | Default response delay (ms)              | 0       |
| `ENABLE_LOGGING`      | Enable request logging                   | true    |
| `DATA_DIR`            | Directory for mock data files            | ./data  |

---

**Port:** 3002  
**Service Type:** aas-saas-mockapi  
**Purpose:** Development & Testing Only  
**Production:** ⚠️ Not for production use
