import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';

// import { Container } from './styles';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#A52A2A',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textLogo: {
    fontSize: 46,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    color: '#B3B6B7',
  },
  button: {
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#891C1A',
    elevation: 5,
  },
  layout: {
    padding: 10,
    margin: 5,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
  },
});

const Login: React.FC = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const loginUser = async (email: string, password: string) => {
    try {
      if (email == '' || password == '') {
        Alert.alert(
          'Ops!',
          'Por favor, preencha todos os campos para continuar',
        );
      } else {
        let response = await fetch('https://ihelp-back.herokuapp.com/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        });
        let resJSON = await response.json();
        console.log('resLogin', resJSON);
        if (resJSON.message) {
          Alert.alert('Ops!', resJSON.message);
        } else {
          navigation.navigate('Home');
        }
      }
    } catch (error) {
      console.log('Error login', error);
    }
  };

  return (
    <View style={style.container}>
      <SafeAreaView>
        <KeyboardAvoidingView style={{width: windowWidth - 50}}>
          <View style={{marginTop: 50, marginBottom: 50}}>
            <Text style={style.textLogo}>iHelp</Text>
          </View>

          <TextInput
            placeholder="Digite seu email"
            autoCapitalize="none"
            style={[style.input, style.layout]}
            onChangeText={(value) => setEmail(value)}></TextInput>
          <TextInput
            secureTextEntry
            placeholder="Digite sua senha"
            style={[style.input, style.layout]}
            onChangeText={(value) => setPassword(value)}></TextInput>

          <TouchableOpacity
            style={[style.button, style.layout, {marginTop: 40}]}
            onPress={() => {
              loginUser(email, password);
            }}>
            <Text style={[style.text, {fontSize: 20, margin: 5}]}>Entrar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View>
          <TouchableOpacity
            style={[style.button, style.layout, {backgroundColor: '#fff'}]}
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={[style.text, {fontSize: 20, margin: 2, color: '#891C1A'}]}>
              Criar conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{alignSelf: 'center', marginTop: 4}}>
            <Text style={{color: '#fff'}}>Esqueci minha senha.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
