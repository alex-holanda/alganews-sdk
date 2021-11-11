import { generateQueryString } from "..";
import { Payment, Post } from "../@types";
import Service from "../Service";

class PaymentService extends Service {
  static getAllPayments(search: Payment.Query) {
    const queryString = generateQueryString(search);

    return this.Http.get<Payment.Paginated>(
      "/payments".concat(queryString)
    ).then(this.getData);
  }

  static getExistingPayment(paymentId: number) {
    return this.Http.get<Payment.Detailed>(`/payments/${paymentId}`).then(
      this.getData
    );
  }

  static insertNewPayment(payment: Payment.Input) {
    return this.Http.post<Payment.Detailed>("/payments", payment).then(
      this.getData
    );
  }

  static approvePaymentsBatch(paymentIds: number[]) {
    return this.Http.put<{}>("/payments/bulk-approvals", paymentIds).then(
      this.getData
    );
  }

  static getPaymentPreview(paymentPreview: Payment.PreviewInput) {
    return this.Http.post<Payment.Preview>(
      "/payments/previews",
      paymentPreview
    ).then(this.getData);
  }

  static approvePayment(paymentId: number) {
    return this.Http.put<{}>(`/payments/${paymentId}/approval`).then(
      this.getData
    );
  }

  static removeExistingPayment(paymentId: number) {
    return this.Http.delete<{}>(`/payments/${paymentId}`).then(this.getData);
  }

  static getExistingPaymentPosts(paymentId: number, sort?: Payment.Sort) {
    const queryString = sort ? generateQueryString(sort) : "";

    return this.Http.get<Post.WithEarnings[]>(
      `/payments/${paymentId}/posts`.concat(queryString)
    ).then(this.getData);
  }
}

export default PaymentService;
