export interface Address {
  id: number;
  name: string;
  hash: string;
  is_blacklist: boolean;
}

export interface Wallet {
  id: number;
  created: string;
  modified: string;
  user: number;
  address: Address;
}

export interface WalletsResponse {
  count: number;
  next: string;
  previous: string;
  results: Wallet[];
}
