export const mockUserRepository = () => ({
    updateUser: jest.fn(),
    getAll: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    removeUser: jest.fn()
  })