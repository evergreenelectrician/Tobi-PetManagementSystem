#include "FirebaseESP8266.h" // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>
#include <CheapStepper.h>
#include "HX711.h"
#define FIREBASE_HOST "FirebaseLink" //Without http:// or 
https:// schemes
#define FIREBASE_AUTH "AuthCode"
#define WIFI_SSID "SSID"
#define WIFI_PASSWORD "PASS"
CheapStepper stepper (5,4,14,15);
const int LOADCELL_DOUT_PIN = 12;
const int LOADCELL_SCK_PIN = 13;
HX711 scale;
//Define FirebaseESP8266 data object
FirebaseData firebaseData;
FirebaseData motor;
FirebaseJson json;
int m=0;
void setup()
{ 
 Serial.begin(9600);
 WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
 Serial.print("Connecting to Wi-Fi");
 while (WiFi.status() != WL_CONNECTED)
 { 
 Serial.print(".");
 delay(300);
 } 
 Serial.println();
 Serial.println("Server started");
 Serial.print("Connected with IP: ");
 Serial.println(WiFi.localIP());
 Serial.println();
 Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
 Firebase.reconnectWiFi(true);
 stepper.setRpm(12); 
 scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
 scale.set_scale(1431.02);
 scale.tare();
} 
void loop() {
 float a = scale.read();
 a=a/1431; 
 Serial.println(a);
 if (Firebase.setFloat(firebaseData, "/FoodModule/LoadCell", a)){}
 if (Firebase.getInt(motor, "/FoodModule/Motor")) {
 m=motor.to<int>();}
 Serial.println(m);
 if (m==1){
 stepper.moveDegreesCW (90);
 } 
} 