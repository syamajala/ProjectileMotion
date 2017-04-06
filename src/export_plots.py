#!/usr/bin/env python
import argparse
import os
import shutil
import time
from selenium import webdriver


def main(input_path, output_path):

    profile = webdriver.FirefoxProfile()
    profile.set_preference('browser.download.folderList', 2)  # custom location
    profile.set_preference('browser.download.manager.showWhenStarting', False)
    profile.set_preference('browser.download.dir', output_path)
    profile.set_preference('browser.helperApps.neverAsk.saveToDisk', 'image/png')

    driver = webdriver.Firefox(firefox_profile=profile)
    for pth in os.listdir(input_path):
        if not pth.endswith('.html'):
            continue

        driver.get("file://%s" % os.path.join(input_path, pth))
        export_button = driver.find_element_by_xpath("//a[@data-title='Download plot as a png']")
        export_button.click()
        time.sleep(10)
        shutil.move(os.path.join(output_path, 'newplot.png'), os.path.join(pth.replace('.html', '.png')))

    driver.quit()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Export plotly plot to png.")
    parser.add_argument('-i', '--input', dest='input_path', required=True, help="Input path.")
    parser.add_argument('-o', '--output', dest='output_path', required=True, help="Output path.")
    args = parser.parse_args()
    main(args.input_path, args.output_path)
