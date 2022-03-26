
import * as sst from "@serverless-stack/resources";


export default class FrontEndStack extends sst.Stack {

    constructor(scope, id, props) {
        super(scope, id, props);

        const { userApi } = props;

        const site = new sst.ViteStaticSite(this, "ViteSite", {
            path: "frontend",
            environment: {
                REACT_APP_API_URL: userApi.url
            },
        })

        // Show the URLs in the output
        this.addOutputs({
            SiteUrl: site.url,
        });
    }
}