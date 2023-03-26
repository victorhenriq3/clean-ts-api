export const surveyPath = {
    get: {
        tags: ['Enquete'],
        summary: 'API para listar todas as enquetes',
        security: [{
            apiKeyAuth: []
        }],
        responses: {
            200:{
                description: 'Sucesso',
                content: {
                    'application-json': {
                        schema: {
                            $ref: '#/schemas/surveys'
                        }
                    }
                }
            },
            403: {
                $ref: '#/components/forbidden'
            },
            500: {
                $ref: '#/components/unauthorized'
            },
            404: {
                $ref: '#/components/notFound'
            }
        }
    }
}