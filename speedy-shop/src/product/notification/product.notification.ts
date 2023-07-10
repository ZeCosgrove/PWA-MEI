import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SendNotification {
  private readonly firebaseUrl: string = 'https://fcm.googleapis.com/fcm/send';
  private readonly serverKey: string =
    'AAAAHanGxfk:APA91bH2k4oHPCdrkXxrenm-7TV2ej1eg7oZ2bHVileMHP1ZSTR05Lio5cyICqHrFtciD0SShymdgApUS6fvIpO62Q61Qhh6SwORH5JyHiSL7Z_CXl_vAdYajYtViEbcB1gRE6Z4BtQL';

  async Notify(title: string, body: string, users) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `key=${this.serverKey}`,
    };

    users.forEach(async (user) => {
      console.log(user.androidToken);
      if (user.androidToken != null) {
        const payload = {
          to: user.androidToken,
          collapse_key: 'type_a',
          notification: {
            body: body,
            title: title,
          },
        };

        try {
          await axios.post(this.firebaseUrl, payload, {
            headers: headers,
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}
