from time import sleep

import pytest
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup


@pytest.fixture
def driver_for_auth():
    # Добавить url страницы авторизации
    url = ''
    _driver = webdriver.Safari()
    _driver.get(url)
    yield _driver
    _driver.quit()


@pytest.fixture
def driver():
    # Добавить url страницы главных страниц
    url = ''
    _driver = webdriver.Safari()
    _driver.get(url)
    yield _driver
    _driver.quit()


def test_auth(driver_for_auth):
    text_login = 'es@ya.ru'
    text_pass = 'Privet2020'
    sleep(1)
    search_field = driver_for_auth.find_element(By.ID, 'email')
    search_field.send_keys(text_login)
    sleep(1)
    search_field = driver_for_auth.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    search_field.send_keys(Keys.ENTER)
    sleep(5)
    # Добавить url с основной страницей после регистрации
    assert driver_for_auth.current_url == ''


def test_registration(driver_for_auth):
    sleep(1)

    text_login = 'es@ya.ru'
    text_username = 'egor'
    text_pass = 'Privet2020'

    sleep(1)
    search_field = driver_for_auth.find_element(By.NAME, 'username')
    search_field.send_keys(text_username)
    sleep(1)
    search_field = driver_for_auth.find_element(By.NAME, 'email')
    search_field.send_keys(text_login)
    sleep(1)
    search_field = driver_for_auth.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    sleep(1)
    search_field.send_keys(Keys.ENTER)
    sleep(5)
    # Добавить url с основной страницей после регистрации
    assert driver_for_auth.current_url == ''


def test_generation(driver):
    sleep(1)
    driver.find_element(By.PARTIAL_LINK_TEXT, 'Цифры').click()
    sleep(1)
    driver.find_element(By.PARTIAL_LINK_TEXT, 'Строчные буквы').click()
    sleep(1)
    driver.find_element(By.PARTIAL_LINK_TEXT, 'Заглавные буквы').click()
    sleep(1)
    driver.find_element(By.PARTIAL_LINK_TEXT, 'Специальные символы').click()
    sleep(1)
    driver.find_element(By.LINK_TEXT, 'Сгенерировать').click()
    sleep(1)

def test_save_pass(driver):
    driver.find_element(By.LINK_TEXT, 'Сохранить пароль').click()
    sleep(1)
    driver.find_element(By.LINK_TEXT, 'cesar').click()
    sleep(1)

    text_site = 'es@ya.ru'
    text_username = 'egor'
    text_pass = 'Privet2020'

    search_field = driver.find_element(By.NAME, 'site')
    search_field.send_keys(text_site)
    sleep(1)
    search_field = driver.find_element(By.NAME, 'username')
    search_field.send_keys(text_username)
    sleep(1)
    search_field = driver.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    sleep(1)
    search_field.send_keys(Keys.ENTER)
    sleep(5)


def test_table(driver):
    #Доделать полностью тест на удаление, изменение пароля
    driver.find_element(By.CLASS_NAME, 'menu').click()
    sleep(1)
    driver.find_element(By.CLASS_NAME, 'menu').click()



