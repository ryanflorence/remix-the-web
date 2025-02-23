# `file-storage` CHANGELOG

This is the changelog for [`file-storage`](https://github.com/mjackson/remix-the-web/tree/main/packages/file-storage). It follows [semantic versioning](https://semver.org/).

## HEAD

- Fixes race conditions with concurrent calls to `set`
- Shards storage directories for more scalable file systems

## v0.3.0 (2024-11-14)

- Added CommonJS build
- Upgrade to lazy-file@3.1.0

## v0.2.1 (2024-09-04)

- Automatically clean up old files in `LocalFileStorage` when new files are stored with the same key

## v0.2.0 (2024-08-26)

- Moved `LocalFileStorage` to `file-storage/local` export
- Moved `MemoryFileStorage` to `file-storage/memory` export

## v0.1.0 (2024-08-24)

- Initial release
