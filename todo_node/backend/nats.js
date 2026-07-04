// nats.js

const { connect, StringCodec } = require('nats');

let nc;
const sc = StringCodec();

const connectNats = async () => {
  nc = await connect({
    servers: process.env.NATS_URL || 'nats://my-nats.nats.svc.cluster.local:4222'
  });

  console.log('Connected to NATS');
};

const publishEvent = async (payload) => {
  if (!nc) {
    console.log('NATS not connected');
    return;
  }

  nc.publish(
    'todo.events',
    sc.encode(JSON.stringify(payload))
  );
};

module.exports = {
  connectNats,
  publishEvent
};