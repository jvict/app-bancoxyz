export interface Balance {
  currency: string;
  accountBalance: number;
}

// export interface TransferResponse {
//   transfers: Transfer[];
// }



export interface Transfer {
  value: number;
  date: string; // YYYY-MM-DD
  currency: string;
  payeer: {
    document: string;
    name: string;
  };
}

export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
  transferDate: string; // YYYY-MM-DD
}

export interface TransferResponse {
  status: 'success' | 'error';
  message: string
}
