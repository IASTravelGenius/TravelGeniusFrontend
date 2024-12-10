import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore"; // Use 'compat' for version 7 and above
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Create a new document
  createDoc(path: string, data: any) {
    return this.firestore.collection(path).add(data);
  }

  // Get documents with real-time updates
  getCollection(path: string): Observable<any[]> {
    return this.firestore.collection(path).valueChanges({ idField: "id" });
  }

  // Update a document
  updateDoc(path: string, id: string, data: any) {
    return this.firestore.collection(path).doc(id).update(data);
  }

  // Delete a document
  deleteDoc(path: string, id: string) {
    return this.firestore.collection(path).doc(id).delete();
  }
}
