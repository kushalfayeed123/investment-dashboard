import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const API_BASE = "http://localhost:3000"; // Adjust as needed

@Injectable({
  providedIn: "root",
})
export class InvestmentService {
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${API_BASE}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${API_BASE}/login`, credentials);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("idToken");
    if (token) {
      return new HttpHeaders().set("Authorization", `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  // Modified getDashboard to not require the uid
  getDashboard(): Observable<any> {
    return this.http.get(`${API_BASE}/dashboard`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCurrencies(): Observable<any> {
    return this.http.get(`${API_BASE}/currencies`, {
      headers: this.getAuthHeaders(),
    });
  }

  deposit(depositData: any): Observable<any> {
    return this.http.post(`${API_BASE}/deposit`, depositData, {
      headers: this.getAuthHeaders(),
    });
  }

  withdraw(withdrawData: any): Observable<any> {
    return this.http.post(`${API_BASE}/withdraw`, withdrawData, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${API_BASE}/admin/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  approveDeposit(depositApproval: any): Observable<any> {
    return this.http.post(
      `${API_BASE}/admin/deposit-approval`,
      depositApproval,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Fetch transactions by user ID
  getTransactionsByUserId(uid: string): Observable<any> {
    return this.http.get(`${API_BASE}/transactions/${uid}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Fetch all transactions
  getAllTransactions(): Observable<any> {
    return this.http.get(`${API_BASE}/transactions`, {
      headers: this.getAuthHeaders(),
    });
  }
}
