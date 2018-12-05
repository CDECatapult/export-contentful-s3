[![CircleCI](https://circleci.com/gh/CDECatapult/export-contentful-s3.svg?style=svg)](https://circleci.com/gh/CDECatapult/export-contentful-s3)
[![Known Vulnerabilities](https://snyk.io/test/github/CDECatapult/export-contentful-s3/badge.svg)](https://snyk.io/test/github/CDECatapult/export-contentful-s3)

# export-contentful-s3

This AWS lambda export the given Contentful schema to a S3 Bucket.
Only the textual content is saved, not the Assets (images, videos...)

## Environment

It is possible to configure Contentful and S3 using the environment variables.
Run `node .` for synopsis.
