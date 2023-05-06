FROM golang:1.19-alpine AS dev

ENV PATH="/usr/local/go/bin:${PATH}"

RUN apk add --no-cache git build-base

# Hot-Reloader
RUN go install github.com/githubnemo/CompileDaemon@v1.4.0

COPY ./ /api
WORKDIR /api

RUN go build main.go
ENTRYPOINT CompileDaemon --build="go build main.go" --command="./main"