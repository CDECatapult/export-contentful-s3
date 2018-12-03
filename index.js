'use strict'

const AWS = require('aws-sdk')
const spaceExport = require('contentful-export')
const envalid = require('envalid')
const pino = require('pino')()

const { str } = envalid
const env = envalid.cleanEnv(process.env, {
  CF_SPACE_ID: str(),
  CF_MANAGEMENT_TOKEN: str(),
  AWS_S3_BUCKET_NAME: str(),
})

const s3 = new AWS.S3()

const options = {
  spaceId: env.CF_SPACE_ID,
  managementToken: env.CF_MANAGEMENT_TOKEN,
  saveFile: false,
}

exports.handler = (event, context) => {
  const currentDate = new Date().toISOString()
  const key = `contenful-export-${options.spaceId}-${currentDate}.json`

  pino.info(`Exporting contenful ${options.spaceId}`)
  spaceExport(options)
    .then(schema => {
      pino.info(`Storing output to ${env.AWS_S3_BUCKET_NAME}/${key}...`)
      s3.putObject(
        {
          Bucket: env.AWS_S3_BUCKET_NAME,
          Key: key,
          Body: JSON.stringify(schema),
        },
        (err, data) => {
          if (err) {
            pino.error('Error while storing to S3', err)
          } else {
            pino.info('Output stored to S3', data)
          }
          context.done(err, data)
        }
      )
    })
    .catch(err => {
      pino.error('Error while exporting', err)
      context.done(err)
    })
}
