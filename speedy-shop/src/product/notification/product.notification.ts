import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SendNotification {
  private readonly firebaseUrl: string = 'https://fcm.googleapis.com/fcm/send';
  private readonly serverKey: string = 'firebase_messaging_token';

  async Notify(token: string, title: string, body: string) {
    const payload = {
      to: token,
      collapse_key: 'type_a',
      notification: {
        body: body,
        title: title,
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `key=${this.serverKey}`,
    };

    try {
      await axios.post(this.firebaseUrl, payload, {
        headers: headers,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
