FROM golang:1.14.4-alpine3.12 as builder

ENV ROOT_PATH /go/src/github.com/xxx/yyy

WORKDIR $ROOT_PATH

RUN apk add --no-cache \
      alpine-sdk \
      git

RUN addgroup -g 10001 \
      -S admin && \
    adduser -u 10001 \
      -G admin \
      -S admin

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/app && \
      chmod 755 /go/bin/app && \
      chown admin:admin /go/bin/app


FROM scratch

COPY --from=builder /etc/group /etc/group
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /go/bin/app /go/bin/app

USER admin

EXPOSE 9000
CMD ["/go/bin/app"]
