import { HostedZone } from "aws-cdk-lib/aws-route53";
import { StackContext } from "sst/constructs";

interface Zone {
  [key:string]: string;
}

export const ZONE: Zone = {
  prod: "finvo.net",
  dev: "dev.finvo.net",
}

function getZoneName(stage: string): string {
  return ZONE[stage] || "";
}

export function DNS(ctx: StackContext) {
  const stage = ctx.stack.stage;
  const zoneName = getZoneName(stage);

  if (!zoneName) {
    return { domain: "", zone: undefined };
  }

  const zone = new HostedZone(ctx.stack, "zone", {
    zoneName,
  });

  return { domain: zoneName, zone };
}
