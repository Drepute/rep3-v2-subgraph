// import { BigInt } from "@graphprotocol/graph-ts";
import { PodDeployed } from "../generated/PodFactory/PodFactory";
import { CredentialDeployed } from "../generated/templates/Pod/Pod";
import { DiamondCut } from "../generated/templates/DiamondCutFacet/DiamondCutFacet";
// import { DiamondCut } from "../generated/templates/DiamondCutFacet/DiamondCutFacet";
import { Credential, Pod } from "../generated/schema";
import { DiamondCutFacet, Pod as PodTemplate } from "../generated/templates";

export function handlePodDeployed(event: PodDeployed): void {
  let pod = Pod.load(event.params.proxy);
  if (!pod) {
    pod = new Pod(event.params.proxy);
    pod.blockNumber = event.block.number;
    pod.transactionHash = event.transaction.hash;
    pod.blockTimestamp = event.block.timestamp;
    PodTemplate.create(event.params.proxy);
    pod.save();
  }
}

export function handleCredentialDeployed(event: CredentialDeployed): void {
  let credentials = Credential.load(event.params.credential);
    if (!credentials) {
      let credentials = new Credential(event.params.credential);
      credentials.parentPod = event.address;
      credentials.facets = [];
      DiamondCutFacet.create(event.address);
      credentials.save();
    }

}

export function handleDiamondCut(event: DiamondCut): void {
  let credentials = Credential.load(event.address);
  if (credentials) {
    let facets = credentials.facets;
    for(let i = 0; i<= event.params._diamondCut.length; i++){
      facets.push(event.params._diamondCut[i].facetAddress)
    }
    credentials.facets = facets
    credentials.save();
  }
}
