export const signupPath = {
    post: {
        tags: ['Login'],
        summary: 'API para criar conta de um usuário',
        requestBody: {
                content: {
                    'application-json': {
                        schema: {
                            $ref: '#/schemas/signupParams'
                        }
                    }
                }
        },
        responses: {
            200:{
                description: 'Sucesso',
                content: {
                    'application-json': {
                        schema: {
                            $ref: '#/schemas/account'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            500: {
                $ref: '#/components/serverError'
            },
            404: {
                $ref: '#/components/notFound'
            }
        }
    }
}