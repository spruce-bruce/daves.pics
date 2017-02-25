# Daves Pics

## Build

### Api
docker build -t pics-api -f Dockerfile.node . --build-arg PACKAGE_PATH=./api/package.json --build-arg WORKING_DIR=/src/api --rm
docker tag pics-api:latest 071794271341.dkr.ecr.us-west-2.amazonaws.com/pics-api:latest
docker push 071794271341.dkr.ecr.us-west-2.amazonaws.com/pics-api:latest
