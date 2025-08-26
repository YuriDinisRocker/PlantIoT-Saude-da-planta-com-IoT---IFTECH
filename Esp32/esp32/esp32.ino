#include <WiFi.h>
#include <HTTPClient.h>
#include <ModbusMaster.h>


const char* ssid = "1349_Fibra";
const char* password = "NMB4Cft7";


const char* serverName = "http://192.168.100.46:3000/api/dadosIoT"; 


#define RXD2 16
#define TXD2 17
#define DE_RE 4

ModbusMaster node;

void preTransmission() {
  digitalWrite(DE_RE, HIGH);
}

void postTransmission() {
  digitalWrite(DE_RE, LOW);
}

void setup() {
  Serial.begin(115200);

  // RS485
  pinMode(DE_RE, OUTPUT);
  digitalWrite(DE_RE, LOW);
  Serial2.begin(4800, SERIAL_8N1, RXD2, TXD2);

  node.begin(1, Serial2);  // ID = 1
  node.preTransmission(preTransmission);
  node.postTransmission(postTransmission);

  // WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println(" Conectado!");
}

void loop() {
  uint8_t result;
  uint16_t data[5];

  result = node.readHoldingRegisters(0x0001, 5);

  if (result == node.ku8MBSuccess) {
    for (int i = 0; i < 5; i++) {
      data[i] = node.getResponseBuffer(i);
    }

    Serial.printf("N: %d, P: %d, K: %d, pH: %d, Umidade: %d\n",
                  data[0], data[1], data[2], data[3], data[4]);

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/json");

      
      String jsonData = "{";
      jsonData += "\"n\":" + String(data[0]) + ",";
      jsonData += "\"p\":" + String(data[1]) + ",";
      jsonData += "\"k\":" + String(data[2]) + ",";
      jsonData += "\"ph\":" + String(data[3]) + ",";
      jsonData += "\"umidade\":" + String(data[4]);
      jsonData += "}";

      int httpResponseCode = http.POST(jsonData);

      if (httpResponseCode > 0) {
        Serial.print("Resposta da API: ");
        Serial.println(httpResponseCode);
      } else {
        Serial.print("Erro no envio: ");
        Serial.println(httpResponseCode);
      }

      http.end();
    } else {
      Serial.println("WiFi desconectado!");
    }
  } else {
    Serial.print("Erro Modbus: ");
    Serial.println(result);
  }

  delay(1000);
}
