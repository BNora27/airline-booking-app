export interface Payment {
    paymentId: string;
    bookingId: string;
    amount: number;
    method: 'CreditCard' | 'PayPal' | 'UPI';
    status: 'Pending' | 'Completed' | 'Failed';
}
