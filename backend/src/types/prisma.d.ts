import Point from '../lib/dataModels/Points';

declare global {
  namespace PrismaJson {
    type StrokeDataStrokePathType = { 
      points: Point[]
    }
  }
}