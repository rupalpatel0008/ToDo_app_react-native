import React, { createRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import validator from 'validator';
import {
  CustomButton,
  CustomTextInput,
  ProfileImage,
  CustomHeader
} from '../../components';
import { Strings } from '../../constants';
import { Colors } from '../../theme';
import styles from './styles/RegisterScreenStyles';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      isInvalidName: null,
      isInvalidEmail: null,
      isInvalidPassword: null,
      imageSource: ''
    };
  }

  inputRef = {
    name: createRef(),
    email: createRef(),
    password: createRef()
  };

  onNameChange = name => {
    this.setState({
      name,
      isInvalidName: false
    });
    const string = name.replace(/\s/g, '');
    const isValid = validator.isAlpha(string);
    if (!isValid && name.length) {
      this.setState({ isInvalidName: true });
    }
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
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const isValid = new RegExp(regex).test(password);
    if (!isValid && password.length) {
      this.setState({ isInvalidPassword: true });
    }
  };

  renderNameTextInput = () => {
    const { isInvalidName, name } = this.state;
    return (
      <CustomTextInput
        ref={this.inputRef.name}
        style={[styles.textInput, isInvalidName && styles.redBorder]}
        placeholderTextColor={Colors.lightSkyBlue}
        placeholder={Strings.namePlaceholder}
        value={name}
        error={isInvalidName && Strings.invalidName}
        onChangeText={text => this.onNameChange(text)}
        onSubmitEditing={() => this.inputRef.email.current.focus()}
      />
    );
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
        error={isInvalidPassword && Strings.invalidPassword}
        returnKeyType={'done'}
        onChangeText={text => this.onPasswordChange(text)}
      />
    );
  };

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ imageSource: image.path });
    });
  };

  renderButton = () => (
    <View style={styles.buttonContainer}>
      <CustomButton title={Strings.register} onPress={() => {}} />
    </View>
  );

  renderForm = () => {
    const { imageSource } = this.state;
    return (
      <View style={styles.form}>
        <ProfileImage
          imageSource={imageSource}
          onPress={this.openImagePicker}
        />
        <View style={styles.formInputs}>
          {this.renderNameTextInput()}
          {this.renderEmailTextInput()}
          {this.renderPasswordTextInput()}
        </View>
        {this.renderButton()}
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.whiteContainerCenter]}>
        <CustomHeader backEnabled onPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' && 'padding'}>
            {this.renderForm()}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default RegisterScreen;
