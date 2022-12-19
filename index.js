import { resolvePlugin } from "@babel/core";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

var result;

const fun = (androidClientId, iosClientId, event, ...item) => {
  return new Promise((resolve, reject) => {
    GoogleSignin.configure({
      androidClientId: androidClientId,
      iosClientId: iosClientId,
    });

    if (event == "login") {
      GoogleSignin.hasPlayServices()
        .then((hasPlayService) => {
          if (hasPlayService) {
            GoogleSignin.signIn()
              .then((userInfo) => {
                var v = [];

                item.map((i) => {
                  v.push({ [i]: userInfo.user[i] });
                });

                if (item == "all_data") {
                  resolve(userInfo.user);
                } else {
                  resolve(v);
                }
              })
              .catch((e) => {
                reject(e);
                console.log("ERROR IS: " + JSON.stringify(e));
              });
          } else {
            reject({ message: "Error" });
          }
        })
        .catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        });
    }
    if (event == "logout") {
      try {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
      } catch (error) {
        reject(e);
        console.error(error);
      }
    }
  });
};

module.exports = fun;
