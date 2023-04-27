// import { BigInt } from "@graphprotocol/graph-ts";
import { PodDeployed } from "../generated/PodFactory/PodFactory";
import { CredentialDeployed } from "../generated/templates/Pod/Pod";
import { Credential, Pod, TierNFt } from "../generated/schema";
import {
  Pod as PodTemplate,
  TierMintFacet as TierMintTemplate,
} from "../generated/templates";
import { DiamondLoupeFacet } from "../generated/templates/DiamondLoupeFacet/DiamondLoupeFacet";
import { Address, Bytes } from "@graphprotocol/graph-ts";
import {
  TierMint,
  Transfer,
  TierMintFacet as TierMintContract,
} from "../generated/templates/TierMintFacet/TierMintFacet";

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

    // create data source
    TierMintTemplate.create(event.params.credential);

    const diamondLoupeFacet = DiamondLoupeFacet.bind(event.params.credential);
    credentials.facets = diamondLoupeFacet
      .facetAddresses()
      .map<Bytes>((x: Bytes) => x);
    credentials.save();
  }
}

export function handleTierMintTransfer(event: Transfer): void {
  let tierMintFacet = TierMintContract.bind(event.address);
  let tierNft = TierNFt.load(`${event.transaction.hash}${event.params.id}`);
  if (!tierNft) {
    tierNft = new TierNFt(`${event.transaction.hash}${event.params.id}`);
    tierNft.claimer = event.params.to;
    tierNft.blockTimestamp = event.block.timestamp;
    tierNft.credential = event.address;
    let tierDataResult = tierMintFacet.try_getTokenUri(event.params.id);
    if (tierDataResult.reverted) {
      tierNft.metadataUri = "";
    } else {
      tierNft.metadataUri = tierMintFacet.getTokenUri(event.params.id);
    }
    let metaDataResult = tierMintFacet.try_getTierOfToken(event.params.id);
    if (metaDataResult.reverted) {
      tierNft.tier = 0;
    } else {
      tierNft.tier = tierMintFacet.getTierOfToken(event.params.id);
    }
    tierNft.tokenId = event.params.id;
    tierNft.txHash = event.transaction.hash;
    tierNft.save();
  }
}

// export function handleTierMint(event: TierMint): void {
//   let tierNft = TierNFt.load(`${event.transaction.hash}${event.params.tokenId}`);
//   if(!tierNft){
//     tierNft = new TierNFt(`${event.transaction.hash}${event.params.tokenId}`);
//     tierNft.claimer = Address.fromI32(0);
//     tierNft.blockTimestamp = event.block.timestamp;
//     tierNft.credential = event.address;
//     tierNft.tier = event.params.tier;
//     tierNft.metadataUri = '';
//     tierNft.tokenId = event.params.tokenId;
//     tierNft.txHash = event.transaction.hash;
//     tierNft.save();
//   }
// }

// export function handlet(event: TierMint): void {
//   let tierNft = TierNFt.load(
//     `${event.transaction.hash}${event.params.tokenId}`
//   );
//   if (!tierNft) {
//     tierNft = new TierNFt(`${event.transaction.hash}${event.params.tokenId}`);
//     tierNft.claimer = Address.fromI32(0);
//     tierNft.blockTimestamp = event.block.timestamp;
//     tierNft.credential = event.address;
//     tierNft.tier = event.params.tier;
//     tierNft.metadataUri = "";
//     tierNft.tokenId = event.params.tokenId;
//     tierNft.save();
//   }
// }
