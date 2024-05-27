const userTypeDefs = `#graphql
  type User {
    firstName: String!
    lastName: String
    email: String!
    roles: [String],
    permissions: [String],
    DOB: String!,
    location: String,
    phoneNumber: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String
    email: String!
    phoneNumber: String!
    password: String!
    confirmPassword: String!
    DOB: String
    role: [String]!
  }

    input UpdateUserInput {
      firstName: String
      lastName: String
      email: String!
      password: String
      role: [String]
    }

  type Query {
    getUserInfo(email: String): User!
  }

  type Mutation {
    createNewUser(userInput:CreateUserInput): User!
    updateUser(userInput: UpdateUserInput): User!
  }
`;

export default userTypeDefs;
