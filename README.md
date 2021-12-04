# Порядок запуска

* Создать хост для кейклока
* Развернуть бэкэнд сервиса из репозитория https://github.com/slon2015/DigitNetwork с созданным хостом
* Установить хост кейклока в переменную окружения командой:
`export VUE_APP_KEYCLOAK_URL=http://yourhost:8081/auth/`
* собрать проект командой: `docker build --build-arg VUE_APP_KEYCLOAK_URL=$VUE_APP_KEYCLOAK_URL -t front .`
* запустить фронтэнд командой: `docker run -p 8082:80 --name frontend front`

Для доступа к web-приложению перейти по ссылке http://localhost:8082/
