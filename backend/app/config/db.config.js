module.exports = {
    HOST: "mysql-14c01bce-toy-chart.c.aivencloud.com",
    PORT: 21958,
    USER: "avnadmin",
    PASSWORD: process.env.AVIEN_PASSWORD,
    DB: "toyChartDB",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
