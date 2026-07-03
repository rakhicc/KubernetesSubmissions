const { connect, StringCodec } = require('nats');

const sc = StringCodec();

const WEBHOOK_URL = process.env.WEBHOOK_URL;

const start = async () => {

  const nc = await connect({
    servers: process.env.NATS_URL
  });

  console.log('Connected to NATS');

  const subscription = nc.subscribe(
    'todo.events',
    {
      queue: 'broadcaster-group'
    }
  );

  for await (const msg of subscription) {

    const event = JSON.parse(
      sc.decode(msg.data)
    );

    console.log('Received event:', event);

    let message;

    if (event.type === 'created') {

      message =
        `New todo created: ${event.text}`;

    } else {

      message =
        `Todo marked done: ${event.text}`;
    }

    try {

      await fetch(
        WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: 'bot',
            message
          })
        }
      );

      console.log('Sent notification');

    } catch (err) {

      console.error(
        'Webhook failed',
        err
      );
    }
  }
};

start();