import requests
from bs4 import BeautifulSoup
from time import gmtime, strftime

import git
PATH_OF_GIT_REPO = r'k:\8Dion8.github.io\.git'
COMMIT_MESSAGE = 'Update post info'

def git_push():
    try:
        repo = git.Repo(PATH_OF_GIT_REPO)
        repo.git.add(update=True)
        repo.index.commit(COMMIT_MESSAGE)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print('Some error occured while pushing the code')

link = 'https://codegolf.stackexchange.com/search?tab=Active&pagesize=100&q=%22MAWP%2c%20%22%20is%3aanswer'
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
        f.write(titles[i] + ' ' + links[i] + '\n\n')
    f.write('Last updated on: ')
    f.write(strftime("%Y-%m-%d %H:%M:%S", gmtime()))
git_push()