"""Villa23 бот."""
import logging
import os

import requests
from dotenv import load_dotenv
from telegram import Bot, ReplyKeyboardMarkup
from telegram.ext import CommandHandler, Updater

load_dotenv()

secret_token = os.getenv('TOKEN')
chat_ids_env = os.getenv('CHAT_ID')
bot = Bot(token=secret_token)
chat_ids = [chat_id.strip() for chat_id in chat_ids_env.split(',')]

URL = 'https://api.thecatapi.com/v1/images/search'

logger = logging.getLogger('bot')


def get_new_image():
    """Функция запроса новой картинки."""
    try:
        response = requests.get(URL)
    except Exception as error:
        logger.error(f'Ошибка при запросе к основному API: {error}')
        new_url = 'https://api.thedogapi.com/v1/images/search'
        response = requests.get(new_url)
    response = response.json()
    random_cat = response[0].get('url')
    return random_cat


def new_cat(update, context):
    """Функция отправляет фотки в чат."""
    chat = update.effective_chat
    context.bot.send_photo(chat.id, get_new_image())


def wake_up(update, context):
    """Функция приветствует нового пользователя."""
    chat = update.effective_chat
    name = update.message.chat.first_name
    button = ReplyKeyboardMarkup([['/newcat']], resize_keyboard=True)
    context.bot.send_message(
        chat_id=chat.id,
        text=f'Привет, {name}. Посмотри, какого котика я тебе нашёл!',
        reply_markup=button
    )
    context.bot.send_photo(chat.id, get_new_image())


def handler():
    """Функция обрабатывает запросы пользователей."""
    updater = Updater(token=secret_token)

    updater.dispatcher.add_handler(CommandHandler('start', wake_up))
    updater.dispatcher.add_handler(CommandHandler('newcat', new_cat))

    updater.start_polling(poll_interval=20.0)
    updater.idle()


if __name__ == '__main__':
    handler()
