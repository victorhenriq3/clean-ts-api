export const unauthorized = {
        description: 'Credenciais invalidas',
        content: {
            'application-json': {
                schema: {
                    $ref: '#/schemas/error'
                }
            }
        }
}