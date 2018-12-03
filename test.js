const test = require('ava')
//const { mock } = require('sinon')
const mock = require('mock-require')

test.cb('export contentful to s3', t => {
  t.plan(3)

  process.env.CF_SPACE_ID = 'FAKE_SPACE_ID'
  process.env.CF_MANAGEMENT_TOKEN = 'FAKE_MANAGEMENT_TOKEN'
  process.env.AWS_S3_BUCKET_NAME = 'FAKE_AWS_S3'

  const schema = { schema: 'fakeSchema' }

  mock('contentful-export', function() {
    return Promise.resolve(schema)
  })

  mock('aws-sdk', {
    S3: function() {
      return {
        putObject(config) {
          t.is(config.Bucket, 'FAKE_AWS_S3')
          t.regex(config.Key, /FAKE_SPACE_ID.*\.json/)
          t.is(config.Body, JSON.stringify(schema))
          t.end()
        },
      }
    },
  })

  const { handler } = require('./')
  const context = { done() {} }

  handler({}, context)

  //mock(fs, 'readFile').returns(0)

  // cleanup
  //fs.readFile.restore()
  mock.stopAll()
})
