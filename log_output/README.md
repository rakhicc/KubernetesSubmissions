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

# added persistence volume and claim yaml files to mount persistence volume.
mountpath is /data which is shared between the counter app and log_output app.
accessing the resource http://localhost:8081/ shows result which includes timestamp, random string and the counter value.

Note that Ingress expects a service to give a successful response in the path / even if the service is mapped to some other path!

## Exercise 4.7 - Baby steps to GitOps

The screenshot below shows the application Log output application is enabled to use GitOps so that when you commit to the repository, the application is automatically updated.
![alt text](<Screenshot 2026-07-06 at 11.27.19.png>)

