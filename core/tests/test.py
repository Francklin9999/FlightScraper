from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def delay(seconds):
    time.sleep(seconds)

def main():
    origin_input = "Montreal"
    destination_input = "abcOttawa"

    try:
        # Setup Chrome WebDriver
        driver = webdriver.Chrome()  # Make sure you have chromedriver installed and in PATH
        driver.maximize_window()

        url = "https://www.expedia.com/"
        delay(1)
        driver.get(url)

        delay(15)

        # Click on Flights tab
        flight_tab = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '#multi-product-search-form-1 > div > div > div > div > div.uitk-tabs-container > ul > li:nth-child(2) > a'))
        )
        flight_tab.click()

        delay(1)

        # Click on origin input
        origin_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '#FlightSearchForm_ROUND_TRIP > div > div.uitk-layout-flex-item.uitk-layout-flex-item-flex-basis-half_width.uitk-layout-flex-item-flex-grow-1 > div > div.uitk-input-swapper-start-input > div > div > div:nth-child(2) > div:nth-child(1) > button'))
        )
        origin_button.click()

        delay(0.5)

        # Type origin
        for char in origin_input:
            driver.switch_to.active_element.send_keys(char)
            delay(0.1)
        driver.switch_to.active_element.send_keys(Keys.ENTER)
        delay(1)

        delay(2)

        # Click on destination input
        destination_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '#FlightSearchForm_ROUND_TRIP > div > div.uitk-layout-flex-item.uitk-layout-flex-item-flex-basis-half_width.uitk-layout-flex-item-flex-grow-1 > div > div.uitk-input-swapper-end-input > div > div > div:nth-child(2) > div:nth-child(1) > button'))
        )
        destination_button.click()

        # Type destination
        for char in destination_input:
            driver.switch_to.active_element.send_keys(char)
            delay(0.1)
        delay(1)
        driver.switch_to.active_element.send_keys(Keys.ENTER)
        delay(2.5)

        # Click search button
        search_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '#search_button'))
        )
        search_button.click()

        # Keep the browser open (you might want to remove this in production)
        input("Press Enter to close the browser...")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()