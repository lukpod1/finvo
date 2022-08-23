import { Auth } from 'aws-amplify'

export async function signUp(username, password) {
  try {
    const { user } = await Auth.signUp({
      username,
      password
    })
    console.log(user)
  } catch (error) {
    console.log('error signing up:', error);
  }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

export async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}

export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

export async function forgotPassword(username) {
  try {
    await Auth.forgotPassword(username)
  } catch (error) {
    console.log('error initiate a forgot Password request: ', error);
  }
}

export async function forgotPasswordConfirmation() {
  try {
    await Auth.forgotPasswordSubmit(username, code, password)
  } catch (error) {
    
  }
}