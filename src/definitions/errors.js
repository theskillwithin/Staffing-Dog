import get from 'lodash/get'

const tryAgain = 'Please try again or contact support.'
const withTryAgain = (message, elseTryAgain = tryAgain) => `${message} ${elseTryAgain}`

export const codes = {
  // '400_1': 'general changeset/request param/validation error',
  '400_11': withTryAgain('Unkown user.'),
  '400_12': withTryAgain('Job posting was not found.'),
  '400_131': 'No valid relationship between user/profile and application',
  '400_132': 'No valid relationship between user/profile and job posting',
  '400_14': 'Email has already been used.',
  '400_152': 'The password you chose is very unsecure. Please use a differnt password.',
  '400_16': 'Invalid Address',
  '400_171':
    'There was a problem with the password reset link. Check your email or try reseting your password again.',
  '400_172': 'Bad email confirmation link.  Try requesting email confirmation again.',
  '400_2': withTryAgain('There was an unkown error.'),
  '400_21': 'user has to at least complete initial registration to do this',
  '400_3': 'general stripe error',
  '400_4': 'general file upload error',
  '401_1': 'invalid jwt',
  '401_11': withTryAgain('There was an error authenticating.'),
  '401_2': 'invalid fingerprint',
  '401_21': 'no fingerprint detected',
  '401_22': 'fingerprint collision',
  '401_3': 'unrecognized session',
  '401_4': 'We could not find an account matching the email and password provided.',
  '403_1': 'insufficient permissions to accomplish this action',
  '500_1': withTryAgain('There was an unkown 500 error.'),
  '500_11': 'unable to perform thread pseudo caching',
}

const defaultElseError = 'There was an unkown error. Please try again or contact support.'

export const useErrorByCode = (code, elseError = defaultElseError) =>
  codes[code] || elseError

export const useErrorFromResponse = (res, elseError = defaultElseError) =>
  codes[get(res, 'response.data.error_code')] ||
  get(res, 'response.data.message', elseError)
