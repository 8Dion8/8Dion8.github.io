import requests
from bs4 import BeautifulSoup
from time import gmtime, strftime
import git

PATH_OF_GIT_REPO = r'k:\8Dion8.github.io\.git'
COMMIT_MESSAGE = 'Update post info'

#Function to push file change to repo
def git_push():
    try:
        repo = git.Repo(PATH_OF_GIT_REPO)
        repo.git.add(update=True)
        repo.index.commit(COMMIT_MESSAGE)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print('Some error occured while pushing the code')

link = 'https://codegolf.stackexchange.com/search?tab=Active&pagesize=50&q=%22MAWP%2c%20%22%20is%3aanswer'
titles = []
links = []

f = requests.get(link)
soup = BeautifulSoup(f.text, 'html.parser')
results = soup.find_all(class_="result-link")

for i in results:
    #Get link to answer
    link_ = 'https://codegolf.stackexchange.com' + i.a.get('href')
    #Get id of answer
    answer_id = "answer-" + link_[link_.index('#')+1:]
    #Open answer
    x = requests.get(link_)
    soup_ = BeautifulSoup(x.text, 'html.parser')
    #Does the title contain a reference to MAWP?
    reference_a = soup_.find(href="https://esolangs.org/wiki/MAWP")
    if reference_a != None:
        #Add answer to valid answers
        links.append(link_)
        preformatted = i.text
        formatted = preformatted.replace('\n\n\r\n            A: ','')
        formatted = formatted.replace('\r\n        \n\n','')
        titles.append(formatted)
#Write all valid answers to file
with open("scraper\posts.txt", "w") as f:
    for i in range(len(titles)):
        f.write(titles[i] + ' ' + links[i] + '\n\n')
    f.write('Last updated on: ')
    f.write(strftime("%Y-%m-%d %H:%M:%S", gmtime()))
#Push to repo
git_push()