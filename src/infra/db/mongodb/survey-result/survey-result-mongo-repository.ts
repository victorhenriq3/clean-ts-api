import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols";
import { ObjectId } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";

export class SurveyResultMongoRepository implements SaveSurveyResultRepository{
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResult')
        const res = await surveyResultCollection.findOneAndUpdate({
            surveyId: new ObjectId(data.surveyId),
            accountId: new ObjectId(data.accountId)
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true,
            returnDocument: "after"
        })
        
        return res.value && MongoHelper.map(res.value)
    }
}