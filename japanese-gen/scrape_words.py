import requests as r
from bs4 import BeautifulSoup

LINK = 'https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words'

response = r.get(LINK)

soup = BeautifulSoup(response.content,'html.parser')

container = soup.html.body.find(
    'div',id='content'
    ).find(
        'div',id='bodyContent'
        ).find(
            'div',id='mw-content-text'
            ).findAll(
                'div',class_='mw-parser-output')[0]
with open('output.txt','w') as f:
    f.write(container.prettify())

for words in container.findAll('ul'):
    for word in words.findAll('li'):
        for elem in word.contents:
                if elem.findAll('span',{"class":"Jpan"}):
                    print([i for i in elem.children])