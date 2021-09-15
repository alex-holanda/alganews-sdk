import { generateQueryString } from "..";
import { CashFlow } from "../@types";
import Service from "../Service";

class CashFlowService extends Service {
  static getExistingEntry(entryId: number) {
    return this.Http.get<CashFlow.EntryDetailed>(
      `/cashflow/entries/${entryId}`
    ).then(this.getData);
  }

  static updateExistingEntry(entryId: number, entryData: CashFlow.EntryInput) {
    return this.Http.put<CashFlow.EntryDetailed>(
      `/cashflow/entries/${entryId}`,
      entryData
    ).then(this.getData);
  }

  static removeExistingEntry(entryId: number) {
    return this.Http.delete<{}>(`/cashflow/entries/${entryId}`).then(
      this.getData
    );
  }

  static getAllEntries(search: CashFlow.Query) {
    const queryString = generateQueryString(search);
    return this.Http.get<CashFlow.EntrySummary[]>(
      "/cashflow/entries".concat(queryString)
    ).then(this.getData);
  }

  static insertNewEntry(entryData: CashFlow.EntryInput) {
    return this.Http.post<CashFlow.EntryDetailed>(
      "/cashflow/entries",
      entryData
    ).then(this.getData);
  }

  static removeEntriesBatch(entryIds: number[]) {
    return this.Http.put<{}>("/cashflow/entries/bulk-removals", entryIds).then(
      this.getData
    );
  }

  static getExistingCategory(categoryId: number) {
    return this.Http.get<CashFlow.CategoryDetailed>(
      `/cashflow/categories/${categoryId}`
    ).then(this.getData);
  }

  static updateExistingCategory(
    categoryId: number,
    category: CashFlow.CategoryIdInput
  ) {
    return this.Http.put<CashFlow.CategoryDetailed>(
      `/cashflow/entries/${categoryId}`,
      category
    ).then(this.getData);
  }

  static removeExistingCategory(categoryId: number) {
    return this.Http.delete<{}>(`/cashflow/categories/${categoryId}`).then(
      this.getData
    );
  }

  static getAllCategories(search: CashFlow.Sort) {
    const queryString = search ? generateQueryString(search) : "";
    return this.Http.get<CashFlow.CategorySummary[]>(
      "/cashflow/categories".concat(queryString)
    ).then(this.getData);
  }

  static insertNewCategory(categoryData: CashFlow.CategoryInput) {
    return this.Http.post<CashFlow.CategoryDetailed>(
      "/cashflow/categories",
      categoryData
    ).then(this.getData);
  }
}

export default CashFlowService;
