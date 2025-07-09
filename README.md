# aas-saas-mockapi

| Command                   | What it does                                            |
| ------------------------- | ------------------------------------------------------- |
| `make local`              | Run the mockapi in local computer                       |
| `make dev-build`          | Build Mockapi (with cache)                              |
| `make dev-build-no-cache` | Build Mockapi (no cache)                                |
| `make dev-up`             | Run Dev stack (Mockapi) in foreground                   |
| `make dev-up-detached`    | Run Dev stack detached (`-d`)                           |
| `make test-up`            | Run Test stack (Mockapi + test services) foregnd        |
| `make test-up-detached`   | Run Test stack detached                                 |
| `make prod-up`            | Run Prod stack (Mockapi + prod services) foregnd        |
| `make prod-up-detached`   | Run Prod stack detached                                 |
| `make down`               | Tear down the Dev stack                                 |
