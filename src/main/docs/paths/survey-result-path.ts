export const surveyResultPath = {
    put: {
        tags: ['Enquete'],
        summary: 'API para criar resposta de uma enquete',
        requestBody: {
                content: {
                    'application-json': {
                        schema: {
                            $ref: '#/schemas/saveSurveyParams'
                        }
                    }
                }
        },
        parameters: [{
            in: 'path',
            name: 'surveyId',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        responses: {
            200:{
                description: 'Sucesso',
                content: {
                    'application-json': {
                        schema: {
                            $ref: '#/schemas/surveyResult'
                        }
                    }
                }
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