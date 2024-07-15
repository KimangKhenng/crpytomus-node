# Express Server with Docker + Cryptomus API Integration

## Overview

This project is a boilerplate for an Express server that uses Docker for containerization and MongoDB as the database. The project is managed with npm and includes a fixture generation script.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js and npm

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/KimangKhenng/crpytomus-node.git
   cd crpytomus-node
   ```
2. **Create a .env file:**
   ```sh
   copy .env.template .env
   ```
3. **Build and run the Docker containers:**
   ```sh
   docker-compose up -d
   ```
4. **Access the server**:
   Open your browser and navigate to `http://localhost:3000`

## Usage
### Generating Fixtures
To generate fixtures, use the following npm script:
```sh
docker exec -it web-server npm run generate
```
### Starting the Server
To start the server, run:
```sh
docker-compose up
```
This command will build the Docker images and start the containers. The Express server will be available at `http://localhost:3000`, and MongoDB will be available on port `27017`.

