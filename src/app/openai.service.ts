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
  private apiKey = '';

  private headerText: string = 'Provide 25 cities and their coordinates based on the sentence provided. Do not stop at one country, provide to multiple countries based on the information provided based on what the user wants to visit in a holiday, national or international. Keep it to one country only if the user specifies that country or something like that:\n'
  private footerText: string = '\nPlease short answear, just the information provided because I will just make some string operation to extract the city and the coordinates, write them as a json to be easy to extract'

  constructor(private http: HttpClient) {}

  generateText(prompt: string): Observable<any>{
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.apiKey,
      "OpenAI-Project": this.projectId,
      "OpenAI-Organization": this.organization,
    });

    const body = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: this.headerText + prompt + this.footerText}],
      max_tokens: 15000,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
