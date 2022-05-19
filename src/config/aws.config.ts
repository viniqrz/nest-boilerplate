import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => {
  const { ACCESS_KEY_ID_AWS, SECRET_ACCESS_KEY_AWS, S3_BUCKET, NODE_ENV } = process.env;

  return {
    environment: NODE_ENV || 'development',
    aws: {
      awsAccessKeyId: ACCESS_KEY_ID_AWS,
      awsSecretAccessKey: SECRET_ACCESS_KEY_AWS,
      s3Bucket: S3_BUCKET,
    },
  };
});
