import React, { createRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Text,
  View
} from 'react-native';
import validator from 'validator';
import { CustomButton, CustomHeader, CustomTextInput } from '../../components';
import { Strings } from '../../constants';
import { Colors } from '../../theme';
import styles from './styles/LoginScreenStyle';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isInvalidEmail: null,
      isInvalidPassword: null
    };
  }

  inputRef = {
    email: createRef(),
    password: createRef()
  };

  onEmailChange = email => {
    this.setState({
      email,
      isInvalidEmail: false
    });
    const isValid = validator.isEmail(email);
    if (!isValid && email.length) {
      this.setState({ isInvalidEmail: true });
    }
  };

  onPasswordChange = password => {
    this.setState({
      password,
      isInvalidPassword: false
    });
    if (!password.length) {
      this.setState({ isInvalidPassword: true });
    }
  };

  renderEmailTextInput = () => {
    const { isInvalidEmail, email } = this.state;
    return (
      <CustomTextInput
        ref={this.inputRef.email}
        style={[styles.textInput, isInvalidEmail && styles.redBorder]}
        placeholderTextColor={Colors.lightSkyBlue}
        placeholder={Strings.emailPlaceholder}
        value={email}
        error={isInvalidEmail && Strings.invalidEmail}
        onChangeText={text => this.onEmailChange(text)}
        onSubmitEditing={() => this.inputRef.password.current.focus()}
      />
    );
  };

  renderPasswordTextInput = () => {
    const { isInvalidPassword, password } = this.state;
    return (
      <CustomTextInput
        secureTextEntry
        ref={this.inputRef.password}
        style={[styles.textInput, isInvalidPassword && styles.redBorder]}
        placeholderTextColor={Colors.lightSkyBlue}
        placeholder={Strings.passwordPlaceholder}
        value={password}
        error={isInvalidPassword && Strings.emptyPassword}
        returnKeyType={'done'}
        onChangeText={text => this.onPasswordChange(text)}
      />
    );
  };

  renderButton = () => (
    <View style={styles.buttonContainer}>
      <CustomButton title={Strings.login} onPress={() => {}} />
    </View>
  );

  renderTitle = () => <Text style={styles.titleText}>{'Login'}</Text>;

  renderBottomView = () => {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.bottomView}>
        <Text>
          {Strings.member}
          <Text
            style={styles.signupText}
            onPress={() => navigate('RegisterScreen')}
          >
            {Strings.signup}
          </Text>
        </Text>
      </View>
    );
  };

  renderForm = () => (
    <View style={styles.form}>
      {this.renderTitle()}
      <View style={styles.formInputs}>
        {this.renderEmailTextInput()}
        {this.renderPasswordTextInput()}
      </View>
      {this.renderButton()}
      {this.renderBottomView()}
    </View>
  );

  render() {
    return (
      <View style={[styles.whiteContainerCenter]}>
        <CustomHeader />
        <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' && 'padding'}
          >
            {this.renderForm()}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;
