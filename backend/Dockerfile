# Stage 1: Build da aplicação
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar arquivos do Maven primeiro (para cache de dependências)
COPY ./backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copiar código fonte e compilar
COPY ./backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Criar diretório para o banco de dados SQLite
RUN mkdir -p /app/data

# Copiar o JAR da aplicação
COPY --from=build /app/target/doolt-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta (padrão Spring Boot)
EXPOSE 8080

# Variáveis de ambiente para configuração do banco
ENV SPRING_DATASOURCE_URL=jdbc:sqlite:/app/data/BancoDoolt.db
ENV SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.sqlite.JDBC
ENV SPRING_JPA_DATABASE_PLATFORM=org.hibernate.community.dialect.SQLiteDialect
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update
ENV SPRING_JPA_SHOW_SQL=true

# Executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

