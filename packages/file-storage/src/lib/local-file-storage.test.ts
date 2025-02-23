import * as assert from 'node:assert/strict';
import { after, describe, it } from 'node:test';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { LocalFileStorage } from './local-file-storage.ts';

const __dirname = new URL('.', import.meta.url).pathname;

describe('LocalFileStorage', () => {
  let directory = path.resolve(__dirname, '../../test-local-file-storage');

  after(() => {
    fs.rmSync(directory, { recursive: true });
  });

  it('stores and retrieves files', async () => {
    let storage = new LocalFileStorage(directory);
    let lastModified = Date.now();
    let file = new File(['Hello, world!'], 'hello.txt', {
      type: 'text/plain',
      lastModified,
    });

    await storage.set('hello', file);

    assert.ok(await storage.has('hello'));

    let retrieved = await storage.get('hello');

    assert.ok(retrieved);
    assert.equal(retrieved.name, 'hello.txt');
    assert.equal(retrieved.type, 'text/plain');
    assert.equal(retrieved.lastModified, lastModified);
    assert.equal(retrieved.size, 13);

    let text = await retrieved.text();

    assert.equal(text, 'Hello, world!');

    await storage.remove('hello');

    assert.ok(!(await storage.has('hello')));
    assert.equal(await storage.get('hello'), null);
  });

  it('handles race conditions', async () => {
    let storage = new LocalFileStorage(directory);
    let lastModified = Date.now();

    let file1 = new File(['Hello, world!'], 'hello1.txt', {
      type: 'text/plain',
      lastModified,
    });

    let file2 = new File(['Hello, universe!'], 'hello2.txt', {
      type: 'text/plain',
      lastModified,
    });

    let setPromise = storage.set('one', file1);
    await storage.set('two', file2);

    let retrieved1 = await storage.get('one');
    assert.ok(retrieved1);
    assert.equal(await retrieved1.text(), 'Hello, world!');

    await setPromise;
    let retrieved2 = await storage.get('two');
    assert.ok(retrieved2);
    assert.equal(await retrieved2.text(), 'Hello, universe!');
  });
});
