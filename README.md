# Google Easy SignIn tutorial for React Native

**first of all Inatsll below Depandancy's**

```javascript
 npm install react-native-signin-with-google
   npm install @react-native-google-signin/google-signin

  npx react-native link @react-native-google-signin/google-signin
```

**A straightforward approach of creating Google Sign In for a React Native app that works for both iOS and Android.
**
![Image here](https://miro.medium.com/max/1262/1*O_I2lbJ8cr16oscd3fh60Q.png)
Go to* https://console.cloud.google.com/* and create a New Project
![](https://miro.medium.com/max/1400/1*3CBcefA5NAxfSYAl9chwJA.png)

**The navigate to APIs & Services → Credentials**
![](https://miro.medium.com/max/1400/1*usbh1ePF_f3CSx8c0ahhKQ.png)

Click on **CREATE CREDENTIALS → OAuth client ID**
![](https://miro.medium.com/max/1400/1*Xy2GgvCR55DlatbEAhR6RA.png)

**From the Application Type dropdown select iOS**
![](https://miro.medium.com/max/1400/1*3j9hOz9IVpFcXR9_NgXv5Q.png)

Give this key a **Name** (convention is to have a name without any caps the screenshot below is just shared as an example)and **Bundle ID** (same as in your info.plist file of iOS project) and click **CREATE**.

![](https://miro.medium.com/max/1400/1*1ydIt5Bh4pWRbA-aKwW5mg.png)

**You’ll now see the key in your credentials under OAuth 2.0 Client IDs**

![](https://miro.medium.com/max/1400/1*MtM_FsfQAzq21BI6rJmUxw.png)

**For iOS we also need to add a URL scheme. Click on the Name of the key you just created., in my case the name is DECIDER-RN-iOS-App-client and you’ll. be taken to a page like this:**

![](https://miro.medium.com/max/1400/1*SQzFCgG25f61iEGuQUF4UQ.png)

Here copy the** iOS URL scheme** given on the right side and open your React Native iOS project in XCode.

Select your app from the **TARGETS** section, then select the Info tab, and expand the **URL Types** section. Click on. the + button and paste the copied** iOS URL scheme** here.

![](https://miro.medium.com/max/1400/1*FaEBEZz7CWp18kYlVZ9LxQ.png)

That’s it for iOS setup next we’ll create a key for android.

Click on **CREATE CREDENTIALS → OAuth client ID** and this time from **Application type** select **Android.**

![](https://miro.medium.com/max/1400/1*BWOWB6I-JUYaBKEBCdIw1g.png)

Same as before giving it a name and copy the exact **Package name** as per your **AndroidManifest.xml** file.

A new thing here is it’s asking for an **SHA-1** certificate fingerprint.

SHA-1 signing certificate fingerprint restricts usage to your Android apps.

> SHA-1 signing certificate fingerprint restricts usage to your Android apps.
> Learn more

To create an **SHA-1** fingerprint Open your React-Native Project and from its terminal first, do cd android and then run this command:

    keytool -keystore app/debug.keystore -list -v

> **NOTE**: The above command will give you a **DEV** key. To get an **SHA-1 key** for PROD use the above command but replace _debug.keystore_ with your _release.keystore_ and use that SHA-1. I suggest making two keys one for DEV and one for **PROD**.

If it asks you for the password, the password is _android_ press enter and you’ll see

![](https://miro.medium.com/max/1400/1*AgvOCpjjAAb-XErE6Oibmg.png)

Copy the SHA1 (hidden with green) and paste the **SHA-1 key** in the Google Cloud Console ad click on **CREATE**.

![](https://miro.medium.com/max/1400/1*J2ELizE7PikoUTz31VdK0g.png)

###### Great now you have two client IDs one for iOS and one for Android.

---

## Now Go to code Structure

**Import this line in your project**

> **import Google from 'react-native-signin-with-google';**

```javascript
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Google from "react-native-signin-with-google";

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Google(
            "androidClientId",
            "iosClientId",
            //login or logout
            "login"
            //You will get particular data Like
            // id,name,email,familyName,givenName,photo
            'id',
            'name',
            'email',
            'familyName',
            'givenName',
            'photo',

          ).then((i) => {
            console.log("====================================");
            console.log("my Data", JSON.stringify(i, null, 4));
            console.log("====================================");
          });

          // you can also get all data using 'all_data'
          Google(
            "androidClientId",
            "iosClientId",
            //login or logout
            "login"
            'all_data',

          ).then((i) => {
            console.log("====================================");
            console.log("my Data", JSON.stringify(i, null, 4));
            console.log("====================================");
          });


        }}
      >
        <Text style={styles.txt}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { marginTop: 20 }]}
        onPress={() => {
          Google(
            "androidClientId",
            "iosClientId",
            //Login or Logout
            "logout"
          );
        }}
      >
        <Text style={styles.txt}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "darkorange",
  },
  txt: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});
```

###### Congrats 🙌 🎉! you have successfully implemented react-native-signin-with-google for your react native project.
