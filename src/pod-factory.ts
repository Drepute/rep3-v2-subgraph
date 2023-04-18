// import { BigInt } from "@graphprotocol/graph-ts";
import { PodDeployed } from "../generated/PodFactory/PodFactory";
import { CredentialDeployed } from "../generated/templates/Pod/Pod";
// import { DiamondCut } from "../generated/templates/DiamondCutFacet/DiamondCutFacet";
import { Credential, Pod } from "../generated/schema";
import { Pod as PodTemplate } from "../generated/templates";
// import { ExampleEntity } from "../generated/schema";

// export function handleInitialized(event: Initialized): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from);

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (!entity) {
//     entity = new ExampleEntity(event.transaction.from);

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0);
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1);

//   // Entity fields can be set based on event parameters
//   entity.version = event.params.version;

//   // Entities can be written to the store with `.save()`
//   entity.save();

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.createPod(...)
//   // - contract.isTrustedForwarder(...)
//   // - contract.owner(...)
//   // - contract.registry(...)
// }

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

// export function handleCredentialDeployed(event: CredentialDeployed): void {
//   let credentials = Credential.load(event.params.credential);
//     if (!credentials) {
//       let credentials = new Credential(event.params.credential);
//       credentials.parentPod = event.address;
//       credentials.facets = [];
//       // DiamondCutFacet.create(event.address);
//       credentials.save();
//     }
    
// }

// export function handleDiamondCut(event: DiamondCut): void {
//   let credentials = Credential.load(event.address);
//   if (credentials) {
//     let facets = credentials.facets;
//     // event.params._diamondCut.forEach((x)=>{
//     //   facets.push(x.facetAddress);
//     // })
//     for(let i = 0; i<= event.params._diamondCut.length; i++){
//       facets.push(event.params._diamondCut[i].facetAddress)
//     }
//     credentials.facets = facets
//     credentials.save();
//   }
// }