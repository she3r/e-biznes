Zadanie 3 zasługuje na 3.0
Aplikacja to API, która wystawia jeden endpoint: służy on do wysyłania wiadomości za pośrednictwem skonfigurowanego na serwerze bota. Wiadomość jest wysyłana na jeden z kanałów na serwerze. 
Token dla bota oraz ID kanału podaje się w konfiguracji (application.yaml)
W proof-of-work.mkv znajduje się nagranie z ewaluacji API.

Aby uruchomić należy zbudować projekt wskazując na klasę main: discordbot.ApplicationKt

W katalogu umieszczam również przykładowy import endpointa postman (ten sam co na nagraniu)
Rozwiązanie działa na porcie 8080 na localhoscie