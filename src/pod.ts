import { CredentialDeployed } from "../generated/templates/Pod/Pod";
import { Credential } from "../generated/schema";



export function handleCredentialDeployed(event: CredentialDeployed): void {
  let credentials = Credential.load(event.params.credential);
    if (!credentials) {
      let credentials = new Credential(event.params.credential);
      credentials.parentPod = event.address;
      credentials.facets = [];
      // DiamondCutFacet.create(event.address);
      credentials.save();
    }

}

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
