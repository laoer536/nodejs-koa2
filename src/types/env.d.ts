declare namespace NodeJS {
  interface ProcessEnv {
    MYSQL_DATABASE_URL: string
    JWT_SECRET: string
    NODEMAILER_AUTH_EMAIL: string
    NODEMAILER_AUTH_PASS: string
  }
}
