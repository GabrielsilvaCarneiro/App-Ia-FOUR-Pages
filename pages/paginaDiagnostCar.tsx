import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = 'your key'; // Substitua 'your key' pela sua chave da API OpenAI

export function Lazer() {
  const [loading, setLoading] = useState(false);
  const [diagnosticoPrincipal, setDiagnosticoPrincipal] = useState("");
  const [carro, setCarro] = useState("");
  const [marca, setMarca] = useState("");
  const [solucao, setSolucao] = useState("");

  async function fetchSolucao() {
    setLoading(true);
    Keyboard.dismiss();

    // Exemplo de prompt para a API
    const prompt = `Sugira uma solução com base no diagnóstico principal: ${diagnosticoPrincipal}, o carro é ${carro} e a marca é ${marca}.`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KEY_GPT}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 500,
          top_p: 1,
        })
      });
      const data = await response.json();
      const solucaoGerada = data.choices[0].message.content;
      setSolucao(solucaoGerada);
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an alert
      Alert.alert("Erro", "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#f1f1f1" />
      <Text style={styles.header}>DiagnostCar</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Informe qual o problema:</Text>
        <TextInput
          placeholder="Diagnóstico Principal (ex: Barulho de correia, falha do motor, luz amarela no painel)"
          style={styles.input}
          value={diagnosticoPrincipal}
          onChangeText={text => setDiagnosticoPrincipal(text)}
        />
        <TextInput
          placeholder="Qual o seu carro (ex: Corsa, Fiat Palio, Bmw 320i)"
          style={styles.input}
          value={carro}
          onChangeText={text => setCarro(text)}
        />
        <TextInput
          placeholder="A marca do seu carro (ex: Chevrolet, Peugeot)"
          style={styles.input}
          value={marca}
          onChangeText={text => setMarca(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchSolucao}>
        <Text style={styles.buttonText}>Possível Problema</Text>
        <MaterialIcons name="search" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}>
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Analisando seu problema</Text>
            <ActivityIndicator color="#FF5656" size="large" />
          </View>
        )}

        {solucao !== "" && (
          <View style={styles.content}>
            <Text style={styles.title}>Possível problema e solução</Text>
            <Text style={{ lineHeight: 24 }}>{solucao}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54,
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF5656',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
});
