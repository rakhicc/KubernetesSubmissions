# first deployment to kubernetes
a sample nodejs application
execute the following command to deploy to kubernetes:
kubectl apply -f deployment.yaml
then run kubectl get pods to get pod name.
kubectl logs podname will give you the application logs.
