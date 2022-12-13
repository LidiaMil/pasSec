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
    url = 'http://localhost:3000/login'
    _driver = webdriver.Chrome("./chromedriver2")
    _driver.get(url)
    yield _driver
    _driver.quit()


@pytest.fixture
def driver():
    # Добавить url страницы главных страниц
    url = 'http://localhost:3000/'
    _driver = webdriver.Chrome()
    _driver.get(url)
    yield _driver
    _driver.quit()


def test_auth():
    url = 'http://localhost:3000/login'
    driver_for_auth = webdriver.Chrome("./chromedriver2")
    driver_for_auth.get(url)
    text_login = 'lm@getgps.eu'
    text_pass = 'lm@getgps.eu'
    sleep(1)
    search_field = driver_for_auth.find_element(By.ID, 'email')
    search_field.send_keys(text_login)
    sleep(1)
    search_field = driver_for_auth.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    search_field.send_keys(Keys.ENTER)
    sleep(5)
    # Добавить url с основной страницей после регистрации
    assert driver_for_auth.current_url == 'http://localhost:3000/'


def test_registration():
    url = 'http://localhost:3000/login'
    driver_for_auth = webdriver.Chrome("./chromedriver2")
    driver_for_auth.get(url)
    sleep(1)

    text_login = 'es@ya.ru'
    text_username = 'egor'
    text_pass = 'Privet2020'
    driver_for_auth.find_element(By.PARTIAL_LINK_TEXT, 'Регистрация').click()
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
    assert driver_for_auth.current_url == 'http://localhost:3000/'


def test_generation():
    url = 'http://localhost:3000/'
    driver = webdriver.Chrome("./chromedriver2")
    driver.get(url)
    text_login = 'lm@getgps.eu'
    text_pass = 'lm@getgps.eu'
    sleep(1)
    search_field = driver.find_element(By.ID, 'email')
    search_field.send_keys(text_login)
    sleep(1)
    search_field = driver.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    search_field.send_keys(Keys.ENTER)
    sleep(5)
    driver.find_element(By.PARTIAL_LINK_TEXT, 'Сгенерировать пароль').click()
    sleep(1)
    driver.find_element(By.XPATH, '/html/body/div/div/div/div[3]/div/form/label[1]/input').click()
    sleep(1)
    driver.find_element(By.XPATH, '/html/body/div/div/div/div[3]/div/div/div/button').click()
    sleep(1)

def test_save_pass():
    url = 'http://localhost:3000/'
    driver = webdriver.Chrome("./chromedriver2")
    driver.get(url)
    text_login = 'lm@getgps.eu'
    text_pass = 'lm@getgps.eu'
    sleep(1)
    search_field = driver.find_element(By.ID, 'email')
    search_field.send_keys(text_login)
    sleep(1)
    search_field = driver.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    search_field.send_keys(Keys.ENTER)
    sleep(5)
    driver.find_element(By.LINK_TEXT, 'Сохранить пароль').click()
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


def test_table():
    url = 'http://localhost:3000/'
    driver = webdriver.Chrome("./chromedriver2")
    driver.get(url)
    text_login = 'lm@getgps.eu'
    text_pass = 'lm@getgps.eu'
    sleep(1)
    search_field = driver.find_element(By.ID, 'email')
    search_field.send_keys(text_login)
    sleep(1)
    search_field = driver.find_element(By.NAME, 'password')
    search_field.send_keys(text_pass)
    search_field.send_keys(Keys.ENTER)
    sleep(5)
    driver.find_element(By.XPATH, '/html/body/div/div/div/div[1]/header/ul/li[2]/a').click()
    sleep(1)
    driver.find_element(By.XPATH, '/html/body/div/div/div/div[2]/div[2]/div/table/tbody/tr[1]/td[6]/div/ul/li[1]/button').click()
    sleep(1)


if __name__ == '__main__':
    test_auth()
