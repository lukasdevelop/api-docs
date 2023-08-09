import '@fastify/jwt';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        
        user: {
            sub: strng,
            role: 'ADMIN' | 'MEMBER'

        }
    }
}