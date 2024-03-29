import { LoadSurveysController } from "@/presentation/controllers/survey/load-surveys/load-survey-controller-protocols";
import { Controller } from "@/presentation/protocols";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbLoadSurveys } from "@/main/factories/usecases/survey/load-surveys/db-load-surveys";

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadSurveys())
    return makeLogControllerDecorator(controller)
}