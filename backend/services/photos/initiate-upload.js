import { isValidImageContentType, getSupportedContentTypes, getFileSuffixForContentType } from './../../libs/image-mime-types'
import { Responses } from './../../libs/response'
import { v4 as uuid } from 'uuid';
import { s3 as s3Config } from './../../config'
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3();

module.exports.handler = async (event) => {

  // Read metadata from path/body and validate
  const eventId = event.pathParameters.eventId;
  const body = JSON.parse(event.body || '{}');
  const photoMetadata = {
    contentType: body.contentType,
    title: body.title,
    description: body.description
  }

  if (!isValidImageContentType(photoMetadata.contentType)) {
    throw Responses.BadRequest(`Invalid contentType for image. Valid values are: ${getSupportedContentTypes().join(',')}`)
  }

  const photoId = uuid();
  const request = {
    Bucket: s3Config.photosBucket,
    Key: `uploads/event_${eventId}/${photoId}.${getFileSuffixForContentType(photoMetadata.contentType)}`,
    ContentType: photoMetadata.contentType,
    CacheControl: 'max-age=31557600',
    Metadata: {
      ...(photoMetadata),
      photoId,
      eventId
    }
  }

  const s3PutObjectUrl = await s3.getSignedUrlPromise('putObject', request);
  const result = {
    photoId,
    s3PutObjectUrl,
  };

  return Responses.Created(result);

}
