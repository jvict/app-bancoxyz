export interface Balance {
  currency: string;
  accountBalance: number;
}

export interface Transfer {
  value: number;
  date: string; 
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
  transferDate: string; 
}

export interface TransferResponse {
  status: 'success' | 'error';
  message: string
}
