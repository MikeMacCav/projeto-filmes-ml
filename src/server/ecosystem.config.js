//module.exports = {
//  apps: [
//    {
//      name: "projeto-filmes",
//      script: "src/server/server.js",
//      env: {
//        RDS_HOST: "projeto-filmes-db.cspwi8muetef.us-east-1.rds.amazonaws.com",
//        RDS_USER: "administrador",
//        RDS_PASSWORD: "metroid64#$",
//        RDS_DB: "projeto_filmes",
//        DB_PORT: 3306,
//        PORT: 3000
//      }
//    }
//  ]
//};
//
module.exports = {
  apps: [
    {
      name: "projeto-filmes",
      script: "./src/server/server.js", // use ./ para garantir o caminho relativo
      watch: false,                     // evita reinícios desnecessários em produção
      env: {
        NODE_ENV: "production",         // define o ambiente como produção
        RDS_HOST: "projeto-filmes-db.cspwi8muetef.us-east-1.rds.amazonaws.com",
        RDS_USER: "administrador",
        RDS_PASSWORD: "metroid64#$",
        RDS_DB: "projeto_filmes",
        DB_PORT: 3306,
        PORT: 3000
      }
    }
  ]
};

