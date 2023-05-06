# example-app

## About

This is an example full-stack application, utilizing a SQLite DB, a REST API in either Go or Python, and a React frontend.

## Stand up

The easiest way to stand up this application is using Docker:

For the stack that uses the Go API: `docker-compose -f docker-compose.go.yml up`

For the stack that uses the Python API: `docker-compose -f docker-compose.python.yml up`

If Docker is not available, running this locally is possible by following these steps, in order:

1. Turning on one of the APIs (either the Go one or the Python one, they have the same endpoints)
2. Turning on the React client

See the README in each subdirectory for more information on starting that service.
