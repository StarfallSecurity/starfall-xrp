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

export interface Signal {
  id: number;
  name: string;
  data: string;
}
export interface WalletsRelatedAccount {
  id: number;
  predictions: Array<Record<string, any>>;
  created: string;
  modified: string;
  fraud_probability: number;
  is_bot: boolean | null;
  hash: string;
  is_blacklist: boolean | null;
  blockchain_name: string;
  signals: Signal[];
}

export interface WalletsRelatedAccountResponse {
  [key: string]: WalletsRelatedAccount;
}
