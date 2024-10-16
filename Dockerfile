FROM python:3.10.14-slim-bullseye

# Установка системных зависимостей
RUN apt-get update && \
    apt-get install -y supervisor libpq-dev && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

# Установка Gunicorn и Psycopg
RUN pip install gunicorn==20.1.0 && \
    pip install psycopg2-binary==2.9.3

# Установка рабочей директории
WORKDIR /app

# Копирование проекта
COPY . .
RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

# Создаем папку логов
RUN mkdir -p /app/logs

# Сборка статических файлов
RUN python3 manage.py collectstatic --no-input

# Копируем файл supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Команда запуска Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
