# Static Website Deployed with Docker
This project demonstrates the deployment of a static website using Docker. The website includes HTML, CSS, and JavaScript files served through a lightweight Nginx web server.

## Deployment Steps

docker build -t week1 .    

docker run -d -p 8080:80 week1

## This website is now deployed and can be accessed locally or through a Docker-enabled environment. Visit http://localhost:8080 to view it.
