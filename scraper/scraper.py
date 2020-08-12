import requests
from bs4 import BeautifulSoup

link = 'https://codegolf.stackexchange.com/search?tab=active&q="MAWP%2c%20"%20is%3aanswer'
titles = []
links = []
f = requests.get(link)
soup = BeautifulSoup(f.text, 'html.parser')
results = soup.find_all(class_="result-link")
for i in results:
    preformatted = i.text
    formatted = preformatted.replace('\n\n\r\n            A: ','')
    formatted = formatted.replace('\r\n        \n\n','')
    titles.append(formatted)
    link_ = i.a.get('href')
    links.append('https://codegolf.stackexchange.com'+link_)
with open("scraper\posts.txt", "w") as f:
    for i in range(len(titles)):
        f.write(titles[i] + ' ' + links[i] + '\n')