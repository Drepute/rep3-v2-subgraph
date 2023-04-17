// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PodDeployed extends ethereum.Event {
  get params(): PodDeployed__Params {
    return new PodDeployed__Params(this);
  }
}

export class PodDeployed__Params {
  _event: PodDeployed;

  constructor(event: PodDeployed) {
    this._event = event;
  }

  get proxy(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class PodFactory__createPodInputAuthDataStruct extends ethereum.Tuple {
  get userRoles(): Array<PodFactory__createPodInputAuthDataUserRolesStruct> {
    return this[0].toTupleArray<
      PodFactory__createPodInputAuthDataUserRolesStruct
    >();
  }

  get roleCapabilities(): Array<
    PodFactory__createPodInputAuthDataRoleCapabilitiesStruct
  > {
    return this[1].toTupleArray<
      PodFactory__createPodInputAuthDataRoleCapabilitiesStruct
    >();
  }

  get runtimeRoles(): Array<
    PodFactory__createPodInputAuthDataRuntimeRolesStruct
  > {
    return this[2].toTupleArray<
      PodFactory__createPodInputAuthDataRuntimeRolesStruct
    >();
  }

  get runtimeRoleCapabilities(): Array<
    PodFactory__createPodInputAuthDataRuntimeRoleCapabilitiesStruct
  > {
    return this[3].toTupleArray<
      PodFactory__createPodInputAuthDataRuntimeRoleCapabilitiesStruct
    >();
  }

  get publicCapabilities(): Array<
    PodFactory__createPodInputAuthDataPublicCapabilitiesStruct
  > {
    return this[4].toTupleArray<
      PodFactory__createPodInputAuthDataPublicCapabilitiesStruct
    >();
  }
}

export class PodFactory__createPodInputAuthDataUserRolesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get enabled(): boolean {
    return this[1].toBoolean();
  }

  get account(): Address {
    return this[2].toAddress();
  }
}

export class PodFactory__createPodInputAuthDataRoleCapabilitiesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get functionSig(): Bytes {
    return this[1].toBytes();
  }

  get enabled(): boolean {
    return this[2].toBoolean();
  }

  get target(): Address {
    return this[3].toAddress();
  }
}

export class PodFactory__createPodInputAuthDataRuntimeRolesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get calldataRequired(): boolean {
    return this[1].toBoolean();
  }

  get _conditionBytes(): Bytes {
    return this[2].toBytes();
  }
}

export class PodFactory__createPodInputAuthDataRuntimeRoleCapabilitiesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get target(): Address {
    return this[1].toAddress();
  }

  get functionSig(): Bytes {
    return this[2].toBytes();
  }

  get enabled(): boolean {
    return this[3].toBoolean();
  }
}

export class PodFactory__createPodInputAuthDataPublicCapabilitiesStruct extends ethereum.Tuple {
  get functionSig(): Bytes {
    return this[0].toBytes();
  }

  get enabled(): boolean {
    return this[1].toBoolean();
  }

  get target(): Address {
    return this[2].toAddress();
  }
}

export class PodFactory extends ethereum.SmartContract {
  static bind(address: Address): PodFactory {
    return new PodFactory("PodFactory", address);
  }

  createPod(
    _owner: Address,
    parentPod: Address,
    credentialData: Bytes,
    authData: PodFactory__createPodInputAuthDataStruct
  ): Address {
    let result = super.call(
      "createPod",
      "createPod(address,address,bytes,((uint8,bool,address)[],(uint8,bytes4,bool,address)[],(uint8,bool,bytes)[],(uint8,address,bytes4,bool)[],(bytes4,bool,address)[])):(address)",
      [
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromAddress(parentPod),
        ethereum.Value.fromBytes(credentialData),
        ethereum.Value.fromTuple(authData)
      ]
    );

    return result[0].toAddress();
  }

  try_createPod(
    _owner: Address,
    parentPod: Address,
    credentialData: Bytes,
    authData: PodFactory__createPodInputAuthDataStruct
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createPod",
      "createPod(address,address,bytes,((uint8,bool,address)[],(uint8,bytes4,bool,address)[],(uint8,bool,bytes)[],(uint8,address,bytes4,bool)[],(bytes4,bool,address)[])):(address)",
      [
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromAddress(parentPod),
        ethereum.Value.fromBytes(credentialData),
        ethereum.Value.fromTuple(authData)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isTrustedForwarder(forwarder: Address): boolean {
    let result = super.call(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );

    return result[0].toBoolean();
  }

  try_isTrustedForwarder(forwarder: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  registry(): Address {
    let result = super.call("registry", "registry():(address)", []);

    return result[0].toAddress();
  }

  try_registry(): ethereum.CallResult<Address> {
    let result = super.tryCall("registry", "registry():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreatePodCall extends ethereum.Call {
  get inputs(): CreatePodCall__Inputs {
    return new CreatePodCall__Inputs(this);
  }

  get outputs(): CreatePodCall__Outputs {
    return new CreatePodCall__Outputs(this);
  }
}

export class CreatePodCall__Inputs {
  _call: CreatePodCall;

  constructor(call: CreatePodCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get parentPod(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get credentialData(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get authData(): CreatePodCallAuthDataStruct {
    return changetype<CreatePodCallAuthDataStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }
}

export class CreatePodCall__Outputs {
  _call: CreatePodCall;

  constructor(call: CreatePodCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class CreatePodCallAuthDataStruct extends ethereum.Tuple {
  get userRoles(): Array<CreatePodCallAuthDataUserRolesStruct> {
    return this[0].toTupleArray<CreatePodCallAuthDataUserRolesStruct>();
  }

  get roleCapabilities(): Array<CreatePodCallAuthDataRoleCapabilitiesStruct> {
    return this[1].toTupleArray<CreatePodCallAuthDataRoleCapabilitiesStruct>();
  }

  get runtimeRoles(): Array<CreatePodCallAuthDataRuntimeRolesStruct> {
    return this[2].toTupleArray<CreatePodCallAuthDataRuntimeRolesStruct>();
  }

  get runtimeRoleCapabilities(): Array<
    CreatePodCallAuthDataRuntimeRoleCapabilitiesStruct
  > {
    return this[3].toTupleArray<
      CreatePodCallAuthDataRuntimeRoleCapabilitiesStruct
    >();
  }

  get publicCapabilities(): Array<
    CreatePodCallAuthDataPublicCapabilitiesStruct
  > {
    return this[4].toTupleArray<
      CreatePodCallAuthDataPublicCapabilitiesStruct
    >();
  }
}

export class CreatePodCallAuthDataUserRolesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get enabled(): boolean {
    return this[1].toBoolean();
  }

  get account(): Address {
    return this[2].toAddress();
  }
}

export class CreatePodCallAuthDataRoleCapabilitiesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get functionSig(): Bytes {
    return this[1].toBytes();
  }

  get enabled(): boolean {
    return this[2].toBoolean();
  }

  get target(): Address {
    return this[3].toAddress();
  }
}

export class CreatePodCallAuthDataRuntimeRolesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get calldataRequired(): boolean {
    return this[1].toBoolean();
  }

  get _conditionBytes(): Bytes {
    return this[2].toBytes();
  }
}

export class CreatePodCallAuthDataRuntimeRoleCapabilitiesStruct extends ethereum.Tuple {
  get role(): i32 {
    return this[0].toI32();
  }

  get target(): Address {
    return this[1].toAddress();
  }

  get functionSig(): Bytes {
    return this[2].toBytes();
  }

  get enabled(): boolean {
    return this[3].toBoolean();
  }
}

export class CreatePodCallAuthDataPublicCapabilitiesStruct extends ethereum.Tuple {
  get functionSig(): Bytes {
    return this[0].toBytes();
  }

  get enabled(): boolean {
    return this[1].toBoolean();
  }

  get target(): Address {
    return this[2].toAddress();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get registryAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get forwarder(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class SetRegsitryCall extends ethereum.Call {
  get inputs(): SetRegsitryCall__Inputs {
    return new SetRegsitryCall__Inputs(this);
  }

  get outputs(): SetRegsitryCall__Outputs {
    return new SetRegsitryCall__Outputs(this);
  }
}

export class SetRegsitryCall__Inputs {
  _call: SetRegsitryCall;

  constructor(call: SetRegsitryCall) {
    this._call = call;
  }

  get _registry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetRegsitryCall__Outputs {
  _call: SetRegsitryCall;

  constructor(call: SetRegsitryCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}