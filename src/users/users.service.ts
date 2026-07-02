import { Injectable } from '@nestjs/common';
import { firebaseApp } from '../firebase-config';

@Injectable()
export class UsersService {
  private db = firebaseApp.firestore();

  async findAllRoots() {
    // Esto consulta Firestore, no SQL. 0 errores de tabla.
    const snapshot = await this.db.collection('users').where('parentId', '==', null).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
