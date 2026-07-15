export const ResponseMessage = {
  Success: {
    Mutation: 'Save success',
    Query: 'Query success',
    Upload: 'Upload success',
    Update: 'Update success',
    Delete: 'Delete success',
    Login: 'Login success',
    Logout: 'Logout success',
  },
  Error: {
    FileNotFound: 'File not found',
    UploadEmpty: 'No file to upload',
    InvalidParameter: 'We encountered an issue processing your request due to invalid or missing information. Please check your input and try again.',
    Internal: 'Something went wrong on our end. We\'re working to fix it. Please try again in a few moments.',
    InvalidCredential: 'Invalid username or password',
    DuplicatedRecord: 'Duplicated record',
    RequiredFields: 'Please fill in required fields',
    Unauthorized: 'You must be logged in to perform this action',
  },
}

export const ErrorCode = {
  Unauthorized: 'UNAUTHORIZED',
  Unauthenticated: 'UNAUTHENTICATED',
}
