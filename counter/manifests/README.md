# counter app
a sample nodejs application
execute the following command to deploy to kubernetes:
kubectl apply -f manifests/deployment.yaml
then run kubectl get pods to get pod name.
kubectl logs podname will give you the application logs.
# adding service and ingress
created an endpoint /pingpong to output count
kubectl apply -f manifests :run this command to apply the service and ingress.
In the browser go to the below resource to see the result of counter app:
http://localhost:8081/pingpong
The ingress file is shared with log-output.
In the browser go to the below resource to see the result of log-output  app : http://localhost:8081/status
