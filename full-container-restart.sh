#!/bin/bash

docker compose down

docker compose up -d -V --force-recreate --build
