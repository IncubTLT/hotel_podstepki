FROM python:3.10.14-slim-bullseye

# Установка рабочей директории
WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && \
    apt-get install -y supervisor libpq-dev && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

# Установка зависимостей Python
COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

# Установка Gunicorn и Psycopg
RUN pip install gunicorn==20.1.0 && \
    pip install psycopg2-binary==2.9.3

# Копирование и установка зависимостей Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование проекта
COPY . .

# Создаем папку логов
RUN mkdir -p /app/logs

# Сборка статических файлов
RUN python3 manage.py collectstatic --no-input

# Команда запуска: сначала запускаем Redis, затем приложение
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Команда запуска Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
