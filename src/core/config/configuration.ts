import { get } from 'env-var';

export default (): Record<string, any> => ({
  node: {
    env: get('NODE_ENV').default('local').required().asString(),
    name: get('NODE_NAME').default('restaurant-manager').required().asString(),
    url: get('NODE_URL').default('http://localhost:3000').asUrlString(),
    debug: get('NODE_DEBUG').default('false').required().asBool(),
    port: get('NODE_PORT').default(3000).required().asPortNumber(),
  },
  db: {},
  jwtUser: {
    secretKey: get('JWT_PRIVATE_KEY')
      .default('ba7nH{zBs$}6H4mu')
      .required()
      .asString(),
    options: {
      expiresIn: get('JWT_USER_EXPIRE').default('2h').required().asString(),
    },
  },
});
