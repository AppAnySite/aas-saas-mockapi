# Makefile for aas-saas-mockapi

# Compose commands
COMPOSE_MOCKAPI = docker-compose -f aas-saas-mockapi.compose.yml -f docker-network-volumes.yml
COMPOSE_TEST = $(COMPOSE_MOCKAPI) -f docker-compose.test.yml
COMPOSE_PROD = $(COMPOSE_MOCKAPI) -f docker-compose.prod.yml

.PHONY: local dev-build dev-build-no-cache dev-up dev-up-detached test-up test-up-detached prod-up prod-up-detached down

# Local: Run directly on host
local: 
	npm install 
	npm run dev

# Docker Build Targets
dev-build: 
	$(COMPOSE_MOCKAPI) build

dev-build-no-cache:
	$(COMPOSE_MOCKAPI) build --no-cache

# Docker Up Targets
dev-up: dev-build
	$(COMPOSE_MOCKAPI) up

dev-up-detached: dev-build
	$(COMPOSE_MOCKAPI) up -d

test-up:
	$(COMPOSE_TEST) up

test-up-detached:
	$(COMPOSE_TEST) up -d

prod-up:
	$(COMPOSE_PROD) up

prod-up-detached:
	$(COMPOSE_PROD) up -d

# Down (stop all)
down:
	docker-compose \
	  -f aas-saas-mockapi.compose.yml \
	  -f docker-network-volumes.yml \
	  down
