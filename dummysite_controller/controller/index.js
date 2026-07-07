const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const customApi =
  kc.makeApiClient(
    k8s.CustomObjectsApi
  );

const appsApi =
  kc.makeApiClient(
    k8s.AppsV1Api
  );

const coreApi =
  kc.makeApiClient(
    k8s.CoreV1Api
  );

const watch = new k8s.Watch(kc);

const namespace = "default";
 console.log("namespace =", namespace);
 console.log("deployment name =", name);

const createDeployment =
  async (name, url) => {

    const deployment = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',

      metadata: {
        name
      },

      spec: {

        replicas: 1,

        selector: {
          matchLabels: {
            app: name
          }
        },

        template: {

          metadata: {
            labels: {
              app: name
            }
          },

          spec: {

            volumes: [
              {
                name: 'website',
                emptyDir: {}
              }
            ],

            containers: [

              {
                name: 'nginx',

                image: 'nginx:alpine',

                volumeMounts: [
                  {
                    name: 'website',
                    mountPath:
                      '/usr/share/nginx/html'
                  }
                ]
              },

              {
                name: 'fetcher',

                image: 'curlimages/curl',

                command: [
                  'sh',
                  '-c'
                ],

                args: [
                  `
                  curl -L ${url} \
                  > /shared/index.html;

                  sleep infinity
                  `
                ],

                volumeMounts: [
                  {
                    name: 'website',
                    mountPath: '/shared'
                  }
                ]
              }
            ]
          }
        }
      }
    };

   try {
     console.log("namespace =", namespace);
 await appsApi.createNamespacedDeployment(
  namespace,
  deployment
);

  console.log(`Deployment ${name} created`);

} catch (err) {
  console.error('DEPLOYMENT ERROR');
  console.error(err);
}
  };

const createService =
  async (name) => {

    const service = {

      apiVersion: 'v1',
      kind: 'Service',

      metadata: {
        name
      },

      spec: {

        selector: {
          app: name
        },

        ports: [
          {
            port: 80,
            targetPort: 80
          }
        ]
      }
    };

    try {
        console.log("namespace =", namespace);
 await coreApi.createNamespacedService(
  namespace,
  service
);
  console.log(`Service ${name} created`);

} catch (err) {
  console.error('SERVICE ERROR');
  console.error(err);
}
  };

watch.watch(
  '/apis/stable.dwk/v1/dummysites',

  {},

  async (type, obj) => {

    if (type !== 'ADDED') {
      return;
    }

    const siteName =
      obj.metadata.name;

    const websiteUrl =
      obj.spec.website_url;

    console.log(
      `Creating site: ${websiteUrl}`
    );

    await createDeployment(
      siteName,
      websiteUrl
    );

    await createService(
      siteName
    );
  },

  err => {
    console.error(err);
  }
);