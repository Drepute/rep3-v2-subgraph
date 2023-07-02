import { BadgeDeployed } from "../generated/BadgeFactory/BadgeFactory";
import {
  Transfer,
  Badge,
  BadgeUpdated,
} from "../generated/templates/Badge/Badge";
import { Badge as BadgeTemplate } from "../generated/templates";
import { Community, QuestBadge } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleBadgeDeployed(event: BadgeDeployed): void {
  let community = Community.load(event.params.proxy);
  if (!community) {
    community = new Community(event.params.proxy);
    community.blockNumber = event.block.number;
    community.transactionHash = event.transaction.hash;
    community.blockTimestamp = event.block.timestamp;
    BadgeTemplate.create(event.params.proxy);
    community.save();
  }
}
export function handleTransfer(event: Transfer): void {
  let badge = QuestBadge.load(`${event.address}${event.params.id}`);
  if (!badge) {
    badge = new QuestBadge(`${event.address}${event.params.id}`);
    badge.tokenId = event.params.id;
    badge.claimer = event.params.to;
    badge.parentCommunity = event.address;
    badge.blockTimestamp = event.block.timestamp;
    badge.txHash = event.transaction.hash;
    const badgeInstance = Badge.bind(event.address);
    let badgeData = badgeInstance.try_dataOf(event.params.id);
    if (badgeData.reverted) {
      badge.data = BigInt.fromI32(0);
    } else {
      badge.data = badgeInstance.dataOf(event.params.id);
    }
    let badgeTier = badgeInstance.try_tierOf(event.params.id);
    if (badgeTier.reverted) {
      badge.tier = 0;
    } else {
      badge.tier = badgeInstance.tierOf(event.params.id);
    }
    let badgeMetadata = badgeInstance.try_tokenURI(event.params.id);
    if (badgeMetadata.reverted) {
      badge.metadataUri = "";
    } else {
      badge.metadataUri = badgeInstance.tokenURI(event.params.id);
    }
    badge.save();
  } else {
    badge.claimer = event.params.to;
    badge.save();
  }
}

export function handleBadgeUpdated(event: BadgeUpdated): void {
  let badge = QuestBadge.load(
    `${event.address}${event.params.tokenId.toI32()}`
  );
  if (badge) {
    badge.data = event.params.data;
    badge.tier = event.params.tier;
    // badge.metadataUri = event.params.metadata
    const badgeInstance = Badge.bind(event.address);
    let badgeData = badgeInstance.try_tokenURI(event.params.tokenId);
    if (badgeData.reverted) {
      badge.metadataUri = "error";
    } else {
      badge.metadataUri = badgeInstance.tokenURI(event.params.tokenId);
    }
    badge.save();
  }
}
