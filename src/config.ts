export abstract class Config {
  public static mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST_NAME}`
    + `/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
}