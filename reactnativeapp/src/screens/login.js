import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth-context';

const LoginScreen = () => {
  const {signIn} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onLogin = async values => {
    setLoading(true);
    if (values.email && values.password) {
      signIn();
      await new Promise(resolve => setTimeout(resolve, 3000));
      // setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={onLogin}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .min(5, 'Password minimum length is 5'),
      })}>
      {formikProps => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          touched,
          dirty,
          errors,
        } = formikProps;
        return (
          <View style={styles.wrapper}>
            <TextInput
              placeholder="Input email"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errors}>{errors.email}</Text>
            )}
            <TextInput
              placeholder="Input password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}
            {loading ? (
              <ActivityIndicator testID="loading-component" color="red" />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                testID="btn-login"
                style={[
                  styles.button,
                  (!isValid || !dirty) && styles.btnDisabled,
                ]}
                disabled={!isValid || !dirty}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    marginTop: '50%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnDisabled: {
    backgroundColor: '#ccc',
  },
  errors: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    color: 'red',
    paddingTop: 5,
  },
});

export default LoginScreen;
