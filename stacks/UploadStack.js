import * as sst from "@serverless-stack/resources";

export default class UploadStack extends sst.Stack {

  photosApi;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { auth, bucket } = props;

    this.photosApi = new sst.Api(this, "PhotosApi", {
      authorizers: {
        jwt: {
          type: "user_pool",
          userPool: {
            id: auth.userPoolId,
            clientIds: [auth.userPoolClientId]
          }
        }
      },
      defaults: {
        authorizer: "jwt"
      },
      routes: {
        "POST /photos/initiate-upload/{id}": {
          function: {
            handler: "backend/services/photos/initiate-upload.handler",
            environment: { S3_PHOTOS_BUCKET: bucket.bucketName }
          }
        }
      },
      cors: true
    });

    this.addOutputs({
      ApiEndpoint: this.photosApi.url,
    });
  }


}