import requests, bs4, re, time


def get_items():
    page = requests.get("https://riskofrain2.fandom.com/wiki/Items")
    clean_page = bs4.BeautifulSoup(page.text, 'html.parser')

    f = open("items.txt","a")

    for i in range(0,5):
        table = clean_page.select("table")[i]
        item_r = re.compile(r'<td data-sort-value=(.*?)>')
        cleanr = re.compile(r'<.*?>')
        cleantext = re.sub(cleanr, "", str(table))
        if i == 0:
            items = item_r.findall(str(table))
            f.write("\nCommon Items:"+cleantext)
        if i == 1:
            items = item_r.findall(str(table))
            f.write("\n\nUncommon:"+cleantext)
        if i == 2:
            items = item_r.findall(str(table))
            f.write("\n\nLegendary:"+cleantext)
        if i == 3:
            boss_item_r = re.compile(r'<td data-sort-value=(".*?")>')
            items = boss_item_r.findall(str(table))
            items = items[::2]
            f.write("\n\nBoss:"+cleantext)
        if i == 4:
            items = item_r.findall(str(table))
            f.write("\n\nWunar:"+cleantext)
    f.close()

def get_enemies():
    f = open("enemies.txt", "a")
    mon_gallery = requests.get("https://riskofrain2.fandom.com/wiki/Monsters")
    clean_page = bs4.BeautifulSoup(mon_gallery.text, 'html.parser')
    attr_list = ["health", "damage", "speed"]

    mons = clean_page.find("div", id="gallery-0")
    mon_list = []

    for monster in mons.stripped_strings:
        monster = re.sub(r"\s+", '_', monster)
        mon_list.append(monster)

    for monster in mon_list:
        for attr in attr_list:
            f.write(get_attr(monster, attr)+"\n")
    f.close()

def get_attr(mon, attr):
    mon_url = requests.get("https://riskofrain2.fandom.com/wiki/" + mon)
    clean_mon_url = (bs4.BeautifulSoup(mon_url.text, 'html.parser'))
    t = clean_mon_url.find("div", {"data-source": attr})
    t2 = t.find("div", {"class":"pi-data-value pi-font"})
    leest = []
    for i in t2.stripped_strings:
        leest.append(i)
    stwing = (mon+" "+attr+" "+str(leest))
    return stwing
    




get_enemies()
get_items()