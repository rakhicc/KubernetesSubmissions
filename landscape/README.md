# Exercise 5.8 – CNCF Landscape

## Directly Used Technologies

- I used Kubernetes throughout the course to deploy and manage applications.
- I used k3d to create local Kubernetes clusters for the exercises.
- I used Docker to build and push container images.
- I used Helm to install Prometheus.
- I used Prometheus and Kiali for monitoring and visualizing service traffic.
- I used Argo CD for GitOps-based application deployment and synchronization.
- I used Istio in Exercises 5.2 and 5.3 to learn service mesh, traffic management, and traffic splitting.
- I used Knative and Kourier in Exercise 5.6 to deploy a serverless service, test autoscaling, and traffic splitting.
- I used Nginx in Exercise 5.4 as the main container serving Wikipedia content.
- I used PostgreSQL in the Ping-Pong and Todo applications.
- I used Git for source code management.

## Indirectly Used Technologies

- I indirectly used Flannel because k3d (through k3s) uses it for Kubernetes networking.
- I indirectly used CoreDNS for service discovery within Kubernetes clusters.
- I indirectly used containerd as the container runtime used by k3s.
- I indirectly used Envoy through Istio and Kourier.
- I indirectly used Gateway API through Istio and Knative traffic management features.
- I indirectly used etcd as the Kubernetes control plane data store.

## Outside the Course

- I have used Spring Boot in professional projects to develop microservices.
- I have used Java for backend application development.
- I have used Docker for containerizing enterprise applications.
- I have used Apache Kafka for event-driven and messaging-based architectures.
- I have used MongoDB in application development projects.
- I have used Apache Cassandra for distributed data storage solutions.
- I have used IBM DB2 in enterprise applications.
- I have used MySQL in multiple software development projects.

## CNCF Landscape Marking

### Directly Used (Color 1)
- Kubernetes
- Docker
- Helm
- Prometheus
- Kiali
- Argo CD
- Istio
- Knative
- Kourier
- Nginx
- PostgreSQL
- Git

### Indirectly Used (Color 2)
- Flannel
- CoreDNS
- containerd
- Envoy
- Gateway API
- etcd
- apache kafka
- IBM DB2
- apache cassandra
- mysql