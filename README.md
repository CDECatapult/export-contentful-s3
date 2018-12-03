# export-contentful-s3

This AWS lambda is run periodically to export the contentful schema to a S3 Bucket.
Only the textual content is saved, not the Assets (images, videos...)

## Environement

It is possible to configure contentful and S3 using the environment variables. Run `node .` for synopsys.
