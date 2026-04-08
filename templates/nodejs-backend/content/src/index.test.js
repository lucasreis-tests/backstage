const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('${{ values.name }}', () => {
  it('should have a health check', async () => {
    const res = await fetch('http://localhost:${{ values.port }}/healthcheck');
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
  });
});
