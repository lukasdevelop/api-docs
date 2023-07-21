# App

GymPass style app

## Rfs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuario logado
- [ ] Deve ser possível obter o numero de check-ins realizado pelo usuario logado
- [ ] Deve ser possível o usuario obter seu historico de check-ins
- [ ] Deve ser possível o usuario buscar academias próximas
- [ ] Deve ser possível validar o check-in de um usuario
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negocio)
- [ ] O usuario não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuario não pode fazer 2 check-ins no mesmo dia
- [ ] O usuario não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por admnistradores

## RNfs (Requisitos não-funcionais)

- [ ] A senha do usuario precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistido em um banco Postgres
- [ ] Todas as listas de dados precisam estar paginas com 20 itens por pagina
- [ ] O usuario deve ser identificado por um JWT (JSON web token)

## Comandos

npx tsc --init