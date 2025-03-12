# Użyj obrazu bazowego Ubuntu
FROM ubuntu:latest

# Zaktualizuj pakiety i zainstaluj zależności dla pyenv
RUN apt-get update && apt-get install -y \
	curl \
    git \
    make \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev

# Zainstaluj pyenv
RUN curl https://pyenv.run | bash

# Ustaw zmienne środowiskowe dla pyenv
ENV PATH="/root/.pyenv/bin:/root/.pyenv/shims:$PATH"
RUN echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
RUN echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
RUN echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
RUN echo 'eval "$(pyenv init -)"' >> ~/.bashrc

# Zainstaluj Python 3.10 za pomocą pyenv
RUN pyenv install 3.10.0
RUN pyenv global 3.10.0

# Skopiuj pliki aplikacji do kontenera
COPY src/ /app

# Ustaw katalog roboczy
WORKDIR /app


# Zainstaluj wymagane pakiety
RUN python3 -m venv venv
RUN . venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt

# Dodaj instrukcję uruchomienia
CMD ["venv/bin/python", "main.py"]