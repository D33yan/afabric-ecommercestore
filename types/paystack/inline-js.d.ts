declare module '@paystack/inline-js' {
    interface PaystackTransactionConfig {
      key: string
      email: string
      amount: number
      metadata?: Record<string, any>
      onSuccess: (transaction: any) => void
      onCancel?: () => void
    }
  
    export default class PaystackPop {
      newTransaction(config: PaystackTransactionConfig): void
    }
  }