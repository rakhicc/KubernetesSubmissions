# first deployment to kubernetes
a sample nodejs application
execute the following command to deploy to kubernetes:
kubectl apply -f manifests/deployment.yaml
then run kubectl get pods to get pod name.
kubectl logs podname will give you the application logs.
# adding service and ingress
created an endpoint /status to output timestamp and ramdom string
kubectl apply -f manifests :run this command to apply the service and ingress.
In the browser go to the resource to see the result.
http://localhost:8081/status
