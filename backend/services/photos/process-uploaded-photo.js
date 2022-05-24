import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { Responses } from './../../libs/response';

const s3 = new S3();

export const handler = async (event) => {
  const s3Record = event.Records[0].s3;

  // First fetch metadata from S3
  const s3Object = await s3.headObject({ Bucket: s3Record.bucket.name, Key: s3Record.object.key }).promise();
  if (!s3Object.Metadata) {
    // Shouldn't get here
    const errorMessage = 'Cannot process photo as no metadata is set for it';
    log.error(errorMessage, { s3Object, event });
    throw new Error(errorMessage);
  }
  // S3 metadata fields are all lowercase, so need to map them out carefully
  const photoDetails = {
    eventId: s3Object.Metadata.eventid,
    description: s3Object.Metadata.description,
    title: s3Object.Metadata.title,
    id: s3Object.Metadata.photoid,
    contentType: s3Object.Metadata.contentype,
    // Map the S3 bucket key to a CloudFront URL to be stored in the DB
    url: `https://${cloudfront.photosDistributionDomainName}/${s3Record.object.key}`,
  };

  photoDetails.url = `https://${cloudfront.photosDistributionDomainName}/${s3Record.object.key}`;
  // Now write to DDB
  await savePhoto(photoDetails);
};

export const savePhoto = async (newPhoto) => {
  if (!newPhoto.eventId) {
    return  Responses.BadRequest('"eventId" must be set');
  }
  const photo = {
      ...newPhoto,
      id: newPhoto.id || uuid(),
      ...EntityMapper.getTimestampFields(),
  };
  console.debug('Saving photo ...', { photo });
  try {
      const result = await photoMapper.put(photo);
      console.info('Created new photo', { photo, result });
      return photo;
  } catch (error) {
      console.error('Error creating new photo.', { newPhoto }, error);
      throw error;
  }
};