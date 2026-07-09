# Exercise 5.4 - Wikipedia with Init and Sidecar

Implemented:

- nginx main container serving HTML content
- init container downloading the Kubernetes Wikipedia page
- sidecar container periodically downloading a random Wikipedia page
- shared volume used by all containers

Verification:
- Initial page served: Kubernetes Wikipedia page
- Sidecar updates content with a random Wikipedia page every 5-15 minutes