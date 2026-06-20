# second deployment to kubernetes
a sample nodejs application
execute the following command to deploy to kubernetes:
kubectl apply -f manifests/deployment.yaml
then run kubectl get pods to get pod name.
kubectl logs podname will give you the application logs.
to run the application execute the following command
# kubectl port-forward pod-name 8080:3000
now check in browser http://localhost:8080
