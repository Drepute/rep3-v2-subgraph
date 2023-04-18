// import { BigInt } from "@graphprotocol/graph-ts";
import { DiamondCut } from "../generated/templates/DiamondCutFacet/DiamondCutFacet";
import { Credential } from "../generated/schema";
// import { ExampleEntity } from "../generated/schema";


export function handleDiamondCut(event: DiamondCut): void {
  let credentials = Credential.load(event.address);
  if (credentials) {
    let facets = credentials.facets;
    // event.params._diamondCut.forEach((x)=>{
    //   facets.push(x.facetAddress);
    // })
    for(let i = 0; i<= event.params._diamondCut.length; i++){
      facets.push(event.params._diamondCut[i].facetAddress)
    }
    credentials.facets = facets
    credentials.save();
  }
}
