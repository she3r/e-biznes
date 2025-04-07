import itertools
import os
import subprocess
import time
import pytest
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
import re


def extract_price(text):
    match = re.search(r'\$(\d+)', text)
    return int(match.group(1)) if match else 0


# jest factorial(num_of_products) przypadkow testowych. W tym wypadku 6! > 50
num_of_products = 6
combinations_of_products = list(''.join(seq) for seq in itertools.product('01', repeat=num_of_products))[1:]
expected_values = [int(combination, 2) for combination in combinations_of_products]
test_cases = list(
    [index for index, char in enumerate(binary_string) if char == '1'] for binary_string in combinations_of_products)


@pytest.fixture(scope="session", autouse=True)
def setup_teardown():
    # setup
    command_start = '..\zadanie4\main.exe'
    process = subprocess.Popen(command_start)
    url_categories_post = 'http://localhost:8080/categories'
    json_body = {"Name": "Category 1"}
    response = requests.post(url_categories_post, json=json_body)
    assert 200 <= response.status_code < 300, response.status_code
    url_products_post = 'http://localhost:8080/products'
    for i in range(num_of_products):
        # JSON body to be sent in the POST request
        json_body = {
            "Name": f"Product {i + 1}",
            "Price": 2 ** i,
            "CategoryID": 1
        }

        response = requests.post(url_products_post, json=json_body)
        assert 200 <= response.status_code < 300, response.status_code
    yield

    # teardown
    process.terminate()
    process.wait()
    file_to_remove_db = '.\zadanie4.db'
    if os.path.exists(file_to_remove_db):
        os.remove(file_to_remove_db)


@pytest.mark.parametrize('case_num, case', list(enumerate(test_cases)))
def test_selenium(case_num, case):
    driver = webdriver.Chrome()
    driver.get('http://localhost:3000')
    time.sleep(1)
    positions = driver.find_elements(By.TAG_NAME, 'li')
    prices = []
    for i, pos in enumerate(positions):
        if (num_of_products - 1 - i) not in case:
            continue
        checkbox = pos.find_element(By.TAG_NAME, 'input')
        text = pos.text
        price = extract_price(text)
        prices.append(price)
        checkbox.click()
        time.sleep(0.5)

    all_checked_sum = sum(prices)
    expected_sum = expected_values[case_num]
    assert all_checked_sum == expected_sum, 'test error. Test case is invalid. all_checked_sum != expected_sum'

    h2_element = driver.find_element(By.TAG_NAME, 'h2')
    h2_price_match = extract_price(h2_element.text)

    assert h2_price_match is not None, f'test error. Test case is invalid. h2_price_match'
    assert expected_sum == h2_price_match, f"Oczekiwana suma: {expected_sum}, ale znaleziono: {h2_price_match}"
    # Zamknięcie przeglądarki
    driver.quit()
