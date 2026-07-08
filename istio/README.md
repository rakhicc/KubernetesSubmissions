# Exercise 5.2

Installed Istio Ambient Mode on a k3d cluster.

Completed:
- Istio CLI installation
- Ambient mode installation
- Prometheus installation
- Kiali installation
- Bookinfo deployment
- Traffic verification in Kiali

Verified access to:
- Bookinfo application
- Kiali dashboard
- Service mesh traffic graph

kubectl get pods -n istio-system
NAME                      READY   STATUS    RESTARTS   AGE
istio-cni-node-f8zj5      1/1     Running   0          51s
istio-cni-node-jg7fg      1/1     Running   0          51s
istio-cni-node-82xm6      1/1     Running   0          51s
istiod-84d4b89dbc-crpnm   1/1     Running   0          51s
ztunnel-r5vv8             1/1     Running   0          35s
ztunnel-5rlbn             1/1     Running   0          35s
ztunnel-zvrsq             1/1     Running   0          35s



 kubectl get svc -n monitoring

NAME                            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
prom-alertmanager-headless      ClusterIP   None            <none>        9093/TCP   11s
prom-prometheus-server          ClusterIP   10.43.248.222   <none>        80/TCP     11s
prom-prometheus-node-exporter   ClusterIP   10.43.128.139   <none>        9100/TCP   11s
prom-kube-state-metrics         ClusterIP   10.43.29.239    <none>        8080/TCP   11s
prom-prometheus-pushgateway     ClusterIP   10.43.92.5      <none>        9091/TCP   11s
prom-alertmanager               ClusterIP   10.43.216.219   <none>        9093/TCP   11s

kubectl get pods
NAME                                      READY   STATUS    RESTARTS   AGE
reviews-v3-5cb9db9dcb-xgdhp               1/1     Running   0          4m5s
details-v1-588f494b8d-rdt55               1/1     Running   0          4m5s
reviews-v1-568797f58d-rklnw               1/1     Running   0          4m5s
ratings-v1-cd996d5c6-8fncp                1/1     Running   0          4m5s
reviews-v2-848657dc84-5t89b               1/1     Running   0          4m5s
productpage-v1-7564654d85-g9xxq           1/1     Running   0          4m5s
bookinfo-gateway-istio-779fd57f5c-2p7p7   1/1     Running   0          42s

![alt text](image.png)
![alt text](image-1.png)