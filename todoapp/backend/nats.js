const { connect, StringCodec } = require('nats');

let nc;
const sc = StringCodec();

const connectNats = async () => {
  nc = await connect({
    servers:
      process.env.NATS_URL ||
      'nats://my-nats.nats.svc.cluster.local:4222',

    maxReconnectAttempts: -1
  });

  console.log('Connected to NATS');

  nc.closed().then((err) => {
    console.error('NATS connection closed:', err);
  });
};

const publishEvent = async (payload) => {
  try {
    console.log('Publishing:', payload);

    if (!nc) {
      console.log('NATS not connected');
      return;
    }

    console.log('NATS closed?', nc.isClosed());

    nc.publish(
      'todo.events',
      sc.encode(JSON.stringify(payload))
    );
   await nc.flush();
    console.log('Published successfully');

  } catch (err) {
    console.error('Publish failed:', err);
  }
};

module.exports = {
  connectNats,
  publishEvent
};
