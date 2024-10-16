FROM python:3.10.14-slim-bullseye

# Установка рабочей директории
WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    sudo \
    supervisor && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Установка переменных среды
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SECRET_KEY=DJANGO_SECRET_KEY

# Установка Gunicorn и Psycopg
RUN pip install --upgrade pip && \
    pip install gunicorn==20.1.0 && \
    pip install psycopg2-binary==2.8.6

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
