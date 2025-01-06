import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OpenaiService {
  private apiUrl = "https://api.openai.com/v1/chat/completions";
  private projectId = "	proj_Ve1rwcoz7nN7wFr4mcUr1i8H";
  private organization = "org-HFS2No9ZB2fOZ002OlnPK2Np";

  constructor(private http: HttpClient) {}

  generateText(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer ${this.apiKey}",
      "OpenAI-Project": this.projectId,
      "OpenAI-Organization": this.organization,
    });

    const body = {
      model: "gpt-4o-mini",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
